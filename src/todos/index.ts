import * as Hapi from 'hapi';
import Routes from './routes';

import { ITodo } from './todo';

export function init(server: Hapi.Server) {
  const todos: Array<ITodo> = [];
  Routes(server, todos);
};
