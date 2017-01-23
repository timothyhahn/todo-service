import * as Hapi from 'hapi';
import * as Joi from 'joi';
import TodoController from './todo-controller';
import * as TodoValidator from './todo-validators';

import { ITodo } from './todo';

export default function (server: Hapi.Server, todos: Array<ITodo>) {
  const todoController = new TodoController(todos); // TODO: Persistence in a db
  server.bind(todoController);

  server.route({
    method: 'GET',
    path: '/todos',
    config: {
      handler: todoController.getTodos,
      tags: ['todos', 'api'],
      description: 'Get a list of TODO objects',
    }
  });

  server.route({
    method: 'GET',
    path: '/todos/{id}',
    config: {
      handler: todoController.getTodoById,
      tags: ['todos', 'api'],
      description: 'Get a specific TODO object (by id)',
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'TODO has been found'
            },
            '404': {
              'description': 'TODO not found in storage'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/todos',
    config: {
      handler: todoController.createTodo,
      tags: ['todos', 'api'],
      description: 'Create a new TODO object',
      validate: {
        payload: TodoValidator.createTodoModel
      },
      plugins: {
        'hapi-swagger': {
          response: {
            '201': {
              'description': 'Created a brand new TODO'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/todos/{id}',
    config: {
      handler: todoController.updateTodo,
      tags: ['todos', 'api'],
      description: 'Update a specific TODO object',
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: TodoValidator.updateTodoModel
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Updated TODO'
            },
            '404': {
              'description': 'TODO does not exist'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/tasks/{id}',
    config: {
      handler: todoController.deleteTodo,
      tags: ['todos', 'api'],
      description: 'Delete a specific TODO object',
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Deleted TODO'
            },
            '404': {
              'description': 'TODO never existed - maybe you don\'t exist'
            }
          }
        }
      }
    }
  });
}
