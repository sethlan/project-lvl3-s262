import pageload from '../src/';
import nock from 'nock';

const host = 'https://ru.hexlet.io';
const answer = 'done';
nock(host)
  .get('/')
  .reply(200, answer);
test('work for small chunk', () => {
  expect.assertions(1);
  return expect(pageload(host)).resolves.toBe(answer);
} )
