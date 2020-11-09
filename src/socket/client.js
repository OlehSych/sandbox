import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000', {
  query: {
    token: 'test',
  },
});

socket
  .on('connect', () => {
    console.log('CONNECT');
  })
  .on('error', (error) => {
    console.log('ERROR', error);
  })
  .on('disconnect', (reason) => {
    console.log('DISCONNECT', reason);
  })
  .on('message', data => console.log('message', data));

setInterval(() => {
  socket.send('Client connected');
}, 1000);
