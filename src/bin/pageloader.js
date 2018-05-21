import version from '../../package.json';
import program from 'commander';
import mz from 'mz';
import pageload from '..';

program
  .version(version)
  .usage('[options] <url> <whereToSafe>')
  .arguments('<path> <url>')
  .parse(process.argv);
console.dir(program);
