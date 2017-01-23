import * as Hapi from 'hapi';
import * as _ from 'lodash';
import { IPlugin } from './plugins/interfaces';
import * as Todos from './todos';

export function init() {
  const server = new Hapi.Server();

  server.connection({
    host: 'localhost', // TODO: Configurate
    port: 8000
  });

  // Cool Idea from https://github.com/dwyl/hapi-typescript-example/blob/master/src/server.ts
  const plugins: Array<string> = ['swagger']; // TODO: Configurate
  _(plugins).each((pluginName: String) => {
    const plugin: IPlugin = (require('./plugins/' + pluginName)).default();
    console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
    plugin.register(server);
  });
  Todos.init(server);

  return server;
};
