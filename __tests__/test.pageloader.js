import os from 'os';
import nock from 'nock';
import fs from 'mz/fs';
import path from 'path';
import debug from 'debug';
import pageload from '../src/';

debug.enable('page-loader');
const dataForSave = 'test';
const host = 'http://www.example.com';
const pathName = '/';
const folderForTest = path.join(os.tmpdir(), 'pageloader');
test('test for hyper text only', async () => {
  nock(host).get(pathName).reply(200, dataForSave);
  const folder = await fs.mkdtemp(folderForTest);
  const result = await pageload(host + pathName, folder);
  const dataFromFunc = await fs.readFile(result[0], 'utf8');
  return expect(dataFromFunc).toBe(dataForSave);
});

// test('test for hyper text and image', async () => {
//   const html = await fs.readFile('__tests__/__fixtures__/test.html');
//   const img1 = await fs.readFile('__tests__/__fixtures__/test.png', 'binary');
//   nock(host)
//     .get(pathName)
//     .reply(200, html)
//     .get('/test.png')
//     .reply(200, img1);
//   const folder = await fs.mkdtemp(folderForTest);
//   const pathsToFiles = await pageload(host + pathName, folder);
//   const resHtml = await fs.readFile(pathsToFiles[0], 'utf8');
//   const resImg1 = await fs.readFile(pathsToFiles[1], 'binary');
//   return expect(resImg1).toBe(img1)
//     .expect(html).toBe(resHtml);
// });

// test('test for hyper text and two images', async () => {
//   const html = await fs.readFile('__tests__/__fixtures__/test.html');
//   const img1 = await fs.readFile('__tests__/__fixtures__/test.png', 'binary');
//   const img2 = await fs.readFile('__tests__/__fixtures__/test2.png', 'binary');
//   nock(host)
//     .get(pathName)
//     .reply(200, html)
//     .get('/test.png')
//     .reply(200, img1)
//     .get('/test2.png')
//     .reply(200, img2);
//   const folder = await fs.mkdtemp(folderForTest);
//   const pathsToFiles = await pageload(host + pathName, folder);
//   const resHtml = await fs.readFile(pathsToFiles[0], 'utf8');
//   const resImg1 = await fs.readFile(pathsToFiles[1], 'binary');
//   const resImg2 = await fs.readFile(pathsToFiles[2], 'binary');
//   return expect([resHtml, resImg1, resImg2]).toBe([html, img1, img2]);
// });
