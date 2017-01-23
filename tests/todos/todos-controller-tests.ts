import * as chai from 'chai';

import TodoController from '../../src/todos/todo-controller';
import * as Server from '../../src/server';

const assert = chai.assert;
const server = Server.init();

declare var describe, it;

describe('TODOController tests', () => {
  it('getsTodos', (done) => {
    server.inject({
      method: 'POST',
      url: '/todos',
      payload: {
        description: 'Testing'
      }
    }, (res) => {
      assert.equal(201, res.statusCode);
      server.inject({
        method: 'GET',
        url: '/todos'
      }, (res) => {
        assert.equal(200, res.statusCode);
        const responseBody: Array<any> = JSON.parse(res.payload);
        assert.equal(1, responseBody.length);
        done();
      });
    });
  });
});
