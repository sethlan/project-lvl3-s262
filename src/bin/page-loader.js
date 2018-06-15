#!/usr/bin/env node

import program from 'commander';
import isURL from 'validator/lib/isURL';

import { version } from '../../package.json';
import loadpage from '..';

program
  .version(version, '-v, --version')
  .option('--output [pathForSave]', 'whereToSafe', process.cwd())
  .usage('[options] <address>')
  .arguments('<address>')
  .action((address) => {
    if (!isURL(address)) {
      console.error('Not correct address');
      process.exit(1);
    }
    loadpage(address, program.output)
      .then(names => names.keys.map(key => console.log(`Save in ${names[key]}`)))
      .catch((err) => {
        if (err.code === 'EISDIR') {
          console.error('can\'t write file');
        } else if (err.code === 'ENOTFOUND') {
          console.error('URL not found, please check address or connection');
        } else if (err.code === 'EEXIST') {
          console.error('File or folder already exist');
        } else if (err.response.status >= 400 && err.response.status < 500) {
          console.error('Http client error, probably bad adress');
        } else if (err.response.status >= 500 && err.response.status < 600) {
          console.error('Server error');
        } else {
          console.error(err);
        }
        process.exit(1);
      });
  })
  .parse(process.argv);
