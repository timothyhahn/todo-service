import * as Server from './server';
import * as Hapi from 'hapi';


const server: Hapi.Server = Server.init();

server.start((err: Error) => {
  if (err) {
    throw err;
  }
  console.log('Server running at: ' + server.info.uri);
});
