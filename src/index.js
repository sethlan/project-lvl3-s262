import axios from 'axios';
import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import httpAdapter from 'axios/lib/adapters/http';

const namingFile = (addr) => {
  const { hostname, pathname } = url.parse(addr);
  const normHost = hostname.replace(/\./g, '-');
  const normPath = pathname.replace(/\//g, (str, offset, s) =>
    (offset === s.length - 1 ? '' : '-'));
  return `${normHost}${normPath}.html`;
};
export default (addr, pathDir) => new Promise((resolve, reject) => {
  axios.defaults.adapter = httpAdapter;
  const filename = namingFile(addr);
  const pathForSave = path.resolve(pathDir, filename);
  axios.get(addr)
    .then(res => fs.writeFile(pathForSave, res.data))
    .then(() => resolve(pathForSave))
    .catch(error => reject(error));
});
