import os from 'os';
import nock from 'nock';
import fs from 'mz/fs';
import path from 'path';
import debug from 'debug';
import cheerio from 'cheerio';
import loadpage from '../src/';

debug.enable('page-loader');
const dataForSave = 'test';
const host = 'http://www.example.com';
const pathName = '/';
const textError = 'something awful happened';
const folderForTest = path.join(os.tmpdir(), 'loadpageer');

test('test for hyper text only', async () => {
  nock(host).get(pathName).reply(200, dataForSave);
  const folder = await fs.mkdtemp(folderForTest);
  const { html } = await loadpage(`${host}${pathName}`, folder);
  const dataFromFunc = await fs.readFile(html, 'utf8');
  return expect(dataFromFunc).toBe(dataForSave);
});

test('test for hyper text and image and link', async () => {
  const htmlOrig = await fs.readFile('__tests__/__fixtures__/test.html');
  const res1 = await fs.readFile('__tests__/__fixtures__/screen.css', 'binary');
  const res2 = await fs.readFile('__tests__/__fixtures__/test.png', 'binary');
  nock(host)
    .get(pathName)
    .reply(200, htmlOrig)
    .get('/test.png')
    .reply(200, () => fs.createReadStream('__tests__/__fixtures__/test.png'))
    .get('/screen.css')
    .reply(200, () => fs.createReadStream('__tests__/__fixtures__/screen.css'));
  const folder = await fs.mkdtemp(folderForTest);
  const { html, ...resources } = await loadpage(`${host}${pathName}`, folder);
  const dom = cheerio.load(htmlOrig);
  dom('img').attr('src', path.resolve(folder, 'www-example-com_files/test.png'));
  dom('link').attr('href', path.resolve(folder, 'www-example-com_files/screen.css'));
  const newHtml = dom.html();
  const resHtml = await fs.readFile(html, 'utf8');
  const downRes1 = await fs.readFile(resources['screen.css'], 'binary');
  const downRes2 = await fs.readFile(resources['test.png'], 'binary');
  expect(resHtml).toBe(newHtml);
  expect(downRes1).toBe(res1);
  expect(downRes2).toBe(res2);
});

test('test error not have args', async () =>
  expect(loadpage(`${host}`, '')).rejects.toThrowErrorMatchingSnapshot());

test('test error not correct url', async () =>
  expect(loadpage('http://www', '/')).rejects.toThrowErrorMatchingSnapshot());

test('test error handle', async () => {
  nock(host).get(pathName).replyWithError(textError);
  const folder = await fs.mkdtemp(folderForTest);
  return expect(loadpage(`${host}${pathName}`, folder))
    .rejects
    .toThrowErrorMatchingSnapshot();
});

test('test error statuscode 201', async () => {
  nock(host).get(pathName).reply(201);
  const folder = await fs.mkdtemp(folderForTest);
  return expect(loadpage(`${host}${pathName}`, folder))
    .rejects
    .toThrowErrorMatchingSnapshot();
});

test('test error EISDIR', async () => {
  nock(host).get(pathName).reply(200, dataForSave);
  return expect(loadpage(`${host}${pathName}`, '/folderdnotexist'))
    .rejects
    .toThrowErrorMatchingSnapshot();
});

test('test error ENOTFOUND', async () => {
  nock(host).get(pathName).replyWithError({
    code: 'ENOTFOUND',
  });
  const folder = await fs.mkdtemp(folderForTest);
  return expect(loadpage(`${host}${pathName}`, folder))
    .rejects
    .toThrowErrorMatchingSnapshot();
});

// test('test error EEXIST', async () => {
//   nock(host).get(pathName).reply(200, dataForSave);
//   const folder = await fs.mkdtemp(folderForTest);
//   const { html } = await loadpage(`${host}${pathName}`, folder);
//   const dataFromFunc = await fs.readFile(html, 'utf8');
//   expect(dataFromFunc).toBe(dataForSave);
//   nock(host).get(pathName).reply(200, dataForSave);
//   return expect(loadpage(`${host}${pathName}`, folder))
//     .rejects
//     .toThrowErrorMatchingSnapshot();
// });
