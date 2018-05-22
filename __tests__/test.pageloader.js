import nock from 'nock';
import pageload from '../src/';

const answer = { id: 'done' };

const host2 = 'http://ru.hexlet.io';
const path2 = '/';
nock(host2)
  .get(path2)
  .reply(200, answer);
test('test for http://ru.hexlet.io', () => {
  expect.assertions(1);
  return pageload(host2 + path2)
    .then(data => expect(data).toEqual(answer));
});
// const host = 'http://localhost';
// const path = '/';
// nock(host)
//   .get(path)
//   .reply(200, answer);
// test('test for http://localhost', () => {
//   expect.assertions(1);
//   return pageload(host + path)
//     .then(data => expect(data).toEqual(answer));
// });
