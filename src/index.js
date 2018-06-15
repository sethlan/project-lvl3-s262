import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import debug from 'debug';
import axios from './lib/axios';

const log = debug('page-loader');

const renameFile = (addr) => {
  const { hostname, pathname } = url.parse(addr);
  const normHost = hostname.replace(/\./g, '-');
  const normPath = pathname.replace(/\//g, (str, offset, s) =>
    (offset === s.length - 1 ? '' : '-'));
  log('rewrite %o on %o, %o on %o', hostname, normHost, pathname, normPath);
  return `${normHost}${normPath}`;
};

const namingRes = attr => attr.replace(/\//g, (str, offset, s) => (offset === (s.length - 1 || 0) ? '' : '-'));

const changeHtmlAndDownloadLocalRes = (html, pathToDir) => {
  const dom = cheerio.load(html);
  const pathToRes = [];
  dom('img, link, script').each((i, element) => {
    log('find res', element.tagName);
    const attr = dom(element).attr('src') || dom(element).attr('href');
    if (attr && !path.parse(attr).hostname) {
      log('add path for download', attr);
      pathToRes.push(attr);
      const name = path.resolve(pathToDir, namingRes(attr));
      log('change attr %o on %o', attr, name);
      if (dom(element).attr('src')) {
        log('attr src');
        dom(element).attr('src', name);
      } else {
        log('attr href');
        dom(element).attr('href', name);
      }
    }
  });
  return [dom.html(), ...pathToRes];
};

export default (addr, pathDir) => {
  log('start program, arguments: %o %o', addr, pathDir);
  if (!addr || !pathDir) {
    log(`Don't have one of arguments: URL = ${addr} Path = ${pathDir}`);
    throw new Error(`Don't have one of arguments: URL = ${addr} Path = ${pathDir}`);
  }
  const filename = renameFile(addr);
  const pathForSave = path.resolve(pathDir, filename);
  const dirForRes = path.resolve(pathDir, `${filename}_files`);
  const pathes = {};
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
      pathes.html = `${pathForSave}.html`;
      promises.push(fs.writeFile(pathes.html, html));
      resources.forEach((resource) => {
        log(`start download res${resource}`);
        const name = namingRes(resource);
        promises.push(axios({
          method: 'get',
          url: url.resolve(addr, resource),
          responseType: 'stream',
        }).then((res) => {
          const nameForRes = path.resolve(dirForRes, name);
          pathes[name] = nameForRes;
          res.data.pipe(fs.createWriteStream(nameForRes));
          log('save img', nameForRes);
        }));
      });
      return Promise.all(promises);
    })
    .then(() => {
      log('end program', pathes);
      return pathes;
    });
};
