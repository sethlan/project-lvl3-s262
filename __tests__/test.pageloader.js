import os from 'os';
import nock from 'nock';
import fs from 'mz/fs';
import path from 'path';
import pageload from '../src/';

const dataForSave = 'test';
const host = 'http://www.example.com';
const pathName = '/';
const folderForTest = path.join(os.tmpdir(), 'pageloader');
test('test for http://localhost', async () => {
  nock(host).get(pathName).reply(200, dataForSave);
  const folder = await fs.mkdtemp(folderForTest);
  const pathToFile = await pageload(host + pathName, folder);
  const dataFromFunc = await fs.readFile(pathToFile, 'utf8');
  return expect(dataFromFunc).toBe(dataForSave);
});
