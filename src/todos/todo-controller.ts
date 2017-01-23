import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as _ from 'lodash';

import { ITodo } from './todo';

export default class TodoController {
  private todos: Array<ITodo>;
  constructor(todos: Array<ITodo>) {
    this.todos = todos;
  }

  public getTodos(request: Hapi.Request, reply: Hapi.IReply) {
    reply(this.todos);
  };

  public getTodoById(request: Hapi.Request, reply: Hapi.IReply) {
    const id = parseInt(request.params['id'], 10);
    const todo = _(this.todos).find({id});

    if (todo) {
      reply(todo);
    } else {
      reply(Boom.notFound());
    }
  };

  public createTodo(request: Hapi.Request, reply: Hapi.IReply) {
    const newId = this.todos.length + 1;
    const newTodo = {
      id: newId,
      description: request.payload['description'],
      isComplete: false
    };
    this.todos.push(newTodo);
    reply(newTodo).code(201);
  };

  public updateTodo(request: Hapi.Request, reply: Hapi.IReply) {
    const id = parseInt(request.params['id'], 10);
    const todoIdx = _(this.todos).findIndex({id});
    const todo = this.todos[todoIdx];
    if (todo) {
      if (request.payload['description']) {
        todo.description = request.payload['description'];
      }
      if (request.payload['isComplete']) {
        todo.isComplete = request.payload['isComplete'];
      }
      _.set(this.todos, todoIdx, todo);
      reply(todo);
    } else {
      reply(Boom.notFound());
    }
  };

  public deleteTodo(request: Hapi.Request, reply: Hapi.IReply) {
    const id = parseInt(request.params['id'], 10);
    const todoIdx = _(this.todos).findIndex({id});
    const deletedTask = this.todos[todoIdx];

    if (deletedTask) {
      this.todos.splice(todoIdx, 1);
      reply(deletedTask);
    } else {
      reply(Boom.notFound());
    }
  };
};
