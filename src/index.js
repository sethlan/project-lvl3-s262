import axios from 'axios';
import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import httpAdapter from 'axios/lib/adapters/http';

const namingFile = (addr) => {
  const { hostname, pathname } = url.parse(addr);
  const normHost = hostname.replace(/\./g, '-');
  const normPath = pathname.replace(/\//g, (str, offset, s) =>
    (offset === s.length - 1 ? '' : '-'));
  return `${normHost}${normPath}`;
};

export default (addr, pathDir) => {
  axios.defaults.adapter = httpAdapter;
  const filename = namingFile(addr);
  const pathForSave = path.resolve(pathDir, filename);
  const dirForRes = path.resolve(pathDir, `${filename}_files`);
  const resources = [];
  let $;
  return axios.get(addr)
    .then(({ data }) => {
      $ = cheerio.load(data);
      return Promise.all(['img', 'link', 'script'].map(e => $(e).each((i, element) => {
        const { hostname } = $(element).attr('src') ? url.parse($(element).attr('src')) : { hostname: 'not' };
        if (!hostname) {
          const name = $(element).attr('src').replace(/\//g, (str, offset, s) =>
            (offset === (s.length - 1 || 0) ? '' : '-'));
          const config = {
            url: url.resolve(addr, $(element).attr('src')),
            method: 'get',
            responseType: 'stream',
          };
          axios(config).then((img) => {
            const nameForRes = path.resolve(dirForRes, name);
            resources.push(nameForRes);
            if (!fs.existsSync(dirForRes)) {
              fs.mkdir(dirForRes);
            }
            fs.writeFile(nameForRes);
            $(element).attr('src', nameForRes);
            img.data.pipe(fs.createWriteStream(nameForRes));
          });
        }
      })));
    })
    .then(() => fs.writeFile(`${pathForSave}.html`, $.html()))
    .then(() => [`${pathForSave}.html`, ...resources]);
};
