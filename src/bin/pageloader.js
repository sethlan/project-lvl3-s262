#!/usr/bin/env node

import program from 'commander';
import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import version from '../../package.json';
import pageload from '..';

program
  .version(version)
  .usage('[options] <url> <whereToSafe>')
  .arguments('<path> <url>')
  .parse(process.argv);
pageload(program.url)
  .then((data) => {
    const { hostname, pathname } = url.parse(program.url);
    const filename = `${hostname.replace(/\//g, '-')}-${pathname.replace(/\//g, '-')}.html`;
    const pathForSave = path.resolve(program.path, filename);
    return fs.writeFile(pathForSave, data);
  })
  .catch(error => console.log(error));
