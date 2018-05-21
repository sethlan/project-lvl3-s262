import nock from 'nock';
import pageload from '../src/';

const host = 'http://ru.hexlet.io';
const answer = 'done';
nock(host)
  .get('/')
  .reply(200, answer);
test('work for small chunk', () => {
  expect.assertions(1);
  return expect(pageload(host)).resolves.toBe(answer);
});
