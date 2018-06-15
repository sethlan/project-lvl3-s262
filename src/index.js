import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import debug from 'debug';
// import listr from 'listr';
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

const renameRes = attr => attr.replace(/\//g, (str, offset, s) => (offset === (s.length - 1 || 0) ? '' : '-'));

const changeHtmlAndDownloadLocalRes = (html, pathToDir) => {
  const dom = cheerio.load(html);
  const pathToRes = [];
  dom('img, link, script').each((i, element) => {
    const attr = {
      src: dom(element).attr('src'),
      href: dom(element).attr('href'),
    };
    const source = dom(element).attr('src') ? 'src' : 'href';
    if (attr[source] && !path.parse(attr[source]).hostname) {
      log('find local res', element.tagName, attr[source]);
      pathToRes.push(attr[source]);
      const name = path.resolve(pathToDir, renameRes(attr[source]));
      log('change attr %o on %o', attr, name);
      log(`attr ${source}`, attr[source]);
      dom(element).attr(source, name);
    }
  });
  return [dom.html(), ...pathToRes];
};

export default (addr, pathDir) => new Promise((resolve, reject) => {
  log('start program, arguments: %o %o', addr, pathDir);
  if (!addr || !pathDir || pathDir.length === 0 || addr.length === 0) {
    log(`Don't have one of arguments: URL = ${addr} Path = ${pathDir}`);
    return reject(new Error(`Don't have one of arguments: URL = ${addr} Path = ${pathDir}`));
  }
  const filename = renameFile(addr);
  const pathForSave = path.resolve(pathDir, filename);
  const dirForRes = path.resolve(pathDir, `${filename}_files`);
  const pathes = {};
  return resolve(axios.get(addr)
    .then(({ data, status }) => {
      if (status !== 200) {
        log('bad statusCode', status);
        throw new Error(`statuscode ${status}`);
      }
      log('download html');
      return changeHtmlAndDownloadLocalRes(data, dirForRes);
    }).then(([html, ...resources]) => {
      if (resources.length > 0) {
        log('create a folder');
        return fs.mkdir(dirForRes).then(() => [html, ...resources]);
      }
      return [html, ...resources];
    }).then(([html, ...resources]) => {
      log('make array of promises');
      const promises = [];
      pathes.html = `${pathForSave}.html`;
      promises.push(fs.writeFile(pathes.html, html));
      resources.forEach((resource) => {
        log(`start download res${resource}`);
        const name = renameRes(resource);
        promises.push(axios({
          method: 'get',
          url: url.resolve(addr, resource),
          responseType: 'stream',
        }).then((res) => {
          const nameForRes = path.resolve(dirForRes, name);
          pathes[name] = nameForRes;
          res.data.pipe(fs.createWriteStream(nameForRes));
          log('save resource', nameForRes);
        }));
      });
      return Promise.all(promises);
    })
    .then(() => {
      log('end program', pathes);
      return pathes;
    }));
});
