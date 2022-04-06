import { Server } from 'socket.io';

const server = new Server(3000);

server
  .on('connect', (socket) => {
    const { token } = socket.handshake.auth;

    if (!token.length) {
      socket.emit('unauthorized', 'authentication error');
      socket.disconnect();
      return;
    }

    socket
      .on('message', (message) => {
        console.log('message', message);
      })
      .on('error', (error) => {
        console.log('ERROR', error);
      })
      .on('message_created', (message) => {
        console.log('message_created', message);
      });
  });
