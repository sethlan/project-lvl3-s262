import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import debug from 'debug';
import axios from './lib/axios';

const log = debug('page-loader');

const namingFile = (addr) => {
  const { hostname, pathname } = url.parse(addr);
  const normHost = hostname.replace(/\./g, '-');
  const normPath = pathname.replace(/\//g, (str, offset, s) =>
    (offset === s.length - 1 ? '' : '-'));
  log('rewrite %o on %o, %o on %o', hostname, normHost, pathname, normPath);
  return `${normHost}${normPath}`;
};

const namingRes = attr => attr.replace(/\//g, (str, offset, s) => (offset === (s.length - 1 || 0) ? '' : '-'));

const changeHtmlAndDownloadLocalRes = (html, pathToDir) => new Promise((resolve) => {
  const jquery = cheerio.load(html);
  const pathToRes = [];
  jquery('img, link, script').each((i, element) => {
    log('find res', element.tagName);
    const attr = jquery(element).attr('src') || jquery(element).attr('href');
    if (attr && !path.parse(attr).hostname) {
      log('add path for download', attr);
      pathToRes.push(attr);
      const name = path.resolve(pathToDir, namingRes(attr));
      log('change attr %o on %o', attr, name);
      if (jquery(element).attr('src')) {
        log('attr src');
        jquery(element).attr('src', name);
      } else {
        log('attr href');
        jquery(element).attr('href', name);
      }
    }
  });
  resolve([jquery.html(), ...pathToRes]);
});

export default (addr, pathDir) => {
  log('start program, arguments: %o %o', addr, pathDir);
  if (!addr || !pathDir) {
    log(`Don't have one of arguments: URL = ${addr} Path = ${pathDir}`);
    throw new Error(`Don't have one of arguments: URL = ${addr} Path = ${pathDir}`);
  }
  const filename = namingFile(addr);
  const pathForSave = path.resolve(pathDir, filename);
  const dirForRes = path.resolve(pathDir, `${filename}_files`);
  const answerForEnd = [];
  return fs.mkdir(dirForRes)
    .then(() => axios.get(addr))
    .then(({ data, status }) => {
      if (status !== 200) {
        log('bad statusCode', status);
        throw new Error(`statuscode ${status}`);
      }
      log('download html');
      return changeHtmlAndDownloadLocalRes(data, dirForRes);
    }).then(([html, ...resources]) => {
      log('make array of promises');
      const promises = [];
      answerForEnd.push(`${pathForSave}.html`);
      promises.push(fs.writeFile(answerForEnd[0], html));
      if (resources.length !== 0) {
        resources.forEach((resource) => {
          log(`start download res${resource}`);
          const name = namingRes(resource);
          promises.push(axios({ method: 'get', url: url.resolve(addr, resource), responseType: 'stream' }).then((img) => {
            // if (img.statusCode !== 200) {
            //   log('can\'t download res', img);
            //   throw new Error('can\'t download resources');
            // }
            const nameForRes = path.resolve(dirForRes, name);
            answerForEnd.push(nameForRes);
            // fs.writeFile(nameForRes);
            img.data.pipe(fs.createWriteStream(nameForRes));
            log('save img', nameForRes);
          }));
        });
      }
      return Promise.all(promises);
    })
    .then(() => {
      log('end program', answerForEnd);
      return answerForEnd.length === 1 ? answerForEnd[0] : answerForEnd;
    });
};
