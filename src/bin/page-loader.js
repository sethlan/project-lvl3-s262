#!/usr/bin/env node

import program from 'commander';

import { version } from '../../package.json';
import pageload from '..';

program
  .version(version, '-v, --version')
  .option('--output [pathForSave]', 'whereToSafe')
  .usage('[options] <address>')
  .arguments('<address>')
  .action((address) => {
    pageload(address, program.output || process.cwd())
      .then(names => names.map(name => console.log(`Save in ${name}`)))
      .catch(err => console.log(err));
  })
  .parse(process.argv);
