import {IPlugin, IPluginInfo} from '../interfaces';
import * as Hapi from 'hapi';

export default (): IPlugin => {
  return {
    register: (server: Hapi.Server) => {
      server.register([
        require('inert'),
        require('vision'),
        {
          register: require('hapi-swagger'),
          options: {
            info: {
              title: 'TODOs API',
              description: 'TODOs API Documentation',
              version: '1.0.0'
            },
            tags: [
              {
                'name': 'todos',
                'description': 'API\'s TODOS interface'
              }
            ],
            documentationPath: '/docs'
          }
        }
      ],
      (error) => {
        if (error) {
          console.error('problem with Swagger plugin', error);
        }
      });
    },
    info: () => {
      return {
        name: 'Swagger Documentation',
        version: '1.0.0'
      };
    }
  };
};
