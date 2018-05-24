#!/usr/bin/env node

import program from 'commander';

import version from '../../package.json';
import pageload from '..';

let pathDir;
let addr;
program
  .version(version)
  .option('--output', 'whereToSafe')
  .usage('[options] <pathForSave> <address>')
  .arguments('<pathForSave> <address>')
  .action((pathForSave, address) => {
    pathDir = pathForSave;
    addr = address;
  })
  .parse(process.argv);
pageload(addr, pathDir)
  .then(name => console.log(`Save in ${name}`))
  .catch(err => console.log(err));
