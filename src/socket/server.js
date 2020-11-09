import { Server } from 'socket.io';

const server = new Server(3000);

server.use((socket, next) => {
  const { token } = socket.handshake.query;
  console.log('>>>>>>>>>', token);
  return token.length
    ? next()
    : next(new Error('authentication error')); // TODO: implement error handler for the client
});

server.on('connect', (socket) => {
  socket.on('message', (message) => {
    console.log('message', message);
    socket.emit('error', message);
  });
  socket.on('error', (error) => {
    console.log('ERROR', error);
  });
});
