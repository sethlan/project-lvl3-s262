import nock from 'nock';
import pageload from '../src/';

const host = 'http://ru.hexlet.io';
const path = '/';
const answer = { id: 'done' };
nock(host)
  .get(path)
  .reply(200, answer);
test('work for small chunk', () => {
  expect.assertions(1);
  return pageload(host)
    .then(data => expect(data).toEqual(answer));
});
