#!/usr/bin/env node

import program from 'commander';

import { version } from '../../package.json';
import loadpage from '..';

program
  .version(version, '-v, --version')
  .option('--output [pathForSave]', 'whereToSafe', process.cwd())
  .usage('[options] <address>')
  .arguments('<address>')
  .action(address => loadpage(address, program.output)
    .catch(error => console.error(error)))
  .parse(process.argv);
