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

export default (addr, pathDir) => {
  log('start program');
  axios.defaults.adapter = httpAdapter;
  const filename = namingFile(addr);
  const pathForSave = path.resolve(pathDir, filename);
  const dirForRes = path.resolve(pathDir, `${filename}_files`);
  const resources = [];
  let jquery;
  return axios.get(addr)
    .then(({ data }) => {
      log('downlad html');
      jquery = cheerio.load(data);
      return Promise.all(['img', 'link', 'script'].map(e => jquery(e).each((i, element) => {
        const { hostname } = jquery(element).attr('src') ? url.parse(jquery(element).attr('src')) : { hostname: 'not' };
        if (!hostname) {
          const name = jquery(element).attr('src').replace(/\//g, (str, offset, s) =>
            (offset === (s.length - 1 || 0) ? '' : '-'));
          const config = {
            url: url.resolve(addr, jquery(element).attr('src')),
            method: 'get',
            responseType: 'stream',
          };
          log('make config');
          axios(config).then((img) => {
            const nameForRes = path.resolve(dirForRes, name);
            resources.push(nameForRes);
            if (!fs.existsSync(dirForRes)) {
              fs.mkdir(dirForRes);
            }
            fs.writeFile(nameForRes);
            jquery(element).attr('src', nameForRes);
            img.data.pipe(fs.createWriteStream(nameForRes));
            log('save img', nameForRes);
          });
        }
      })));
    }).then(() => {
      log('write html');
      return fs.writeFile(`${pathForSave}.html`, jquery.html());
    }).then(() => [`${pathForSave}.html`, ...resources]);
};
