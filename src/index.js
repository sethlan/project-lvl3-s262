import axios from 'axios';
import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import httpAdapter from 'axios/lib/adapters/http';
import debug from 'debug';

const log = debug('page-loader');

const namingFile = (addr) => {
  const { hostname, pathname } = url.parse(addr);
  const normHost = hostname.replace(/\./g, '-');
  const normPath = pathname.replace(/\//g, (str, offset, s) =>
    (offset === s.length - 1 ? '' : '-'));
  return `${normHost}${normPath}`;
};

const namingRes = attr => attr.replace(/\//g, (str, offset, s) => (offset === (s.length - 1 || 0) ? '' : '-'));

const changeHtmlAndDownloadLocalRes = (html) => {
  const jquery = cheerio.load(html);
  const pathToRes = [];
  jquery('img', 'link', 'script').each((i, element) => {
    const attr = element.attr('src', 'href');
    if (!path.parse(attr).hostname) {
      log('add path for download', attr);
      pathToRes.push(attr);
      const name = namingRes(attr);
      log('change attr %o on %o', attr, name);
      element.attr('src', 'href', name);
    }
  });
  return [jquery.html(), ...pathToRes];
};

export default (addr, pathDir) => {
  log('start program, arguments: %o %o', addr, pathDir);
  if (!addr || !pathDir) {
    throw new Error(`Don't have one of arguments: URL = ${addr} Path = ${pathDir}`);
  }
  axios.defaults.adapter = httpAdapter;
  const filename = namingFile(addr);
  const pathForSave = path.resolve(pathDir, filename);
  const dirForRes = path.resolve(pathDir, `${filename}_files`);
  const answerForEnd = [];
  return axios.get(addr)
    .then(({ data, status }) => {
      if (status !== 200) {
        log('bad statusCode', status);
        throw new Error(`statuscode ${status}`);
      }
      log('downlad html');
      return changeHtmlAndDownloadLocalRes(data);
    }).then(([html, ...resources]) => {
      log('write html');
      const promises = [];
      answerForEnd.push(`${pathForSave}.html`);
      promises.push(fs.writeFile(answerForEnd[0], html));
      resources.forEach((resource) => {
        const name = namingRes(resource);
        promises.push(axios({ url: url.resolve(addr, resource), responseType: 'stream' }).then((img) => {
          if (img.statusCode !== 200) {
            throw new Error('can\'t download resources');
          }
          const nameForRes = path.resolve(dirForRes, name);
          answerForEnd.push(nameForRes);
          if (!fs.existsSync(dirForRes)) {
            log('make dir for resource', dirForRes);
            fs.mkdir(dirForRes);
          }
          fs.writeFile(nameForRes);
          img.data.pipe(fs.createWriteStream(nameForRes));
          log('save img', nameForRes);
        }));
      });
      return Promise.all(promises);
    }).then(() => answerForEnd);
};
