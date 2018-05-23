import os from 'os';
import nock from 'nock';
import fs from 'mz/fs';
import path from 'path';
import pageload from '../src/';

const answer = 'test';
const host = 'http://www.example.com';
const pathName = '/';
const folderForTest = path.join(os.tmpdir(), 'pageloader');
nock(host)
  .get(pathName)
  .reply(200, answer);
test('test for http://localhost', () => {
  expect.assertions(1);
  return fs.mkdtemp(folderForTest)
    .then(folder => pageload(host + pathName, folder))
    .then(pathToFile => fs.readFile(pathToFile, 'utf8'))
    .then(data => expect(data).toBe(answer))
    .catch(err => console.log(err));
});
