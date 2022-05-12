import io from 'socket.io-client';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzX3BoeXNpcXVlX2lkIjo1MTcsIm1lbWJlcl9ncm91cF9pZCI6MSwiaWF0IjoxNjE4ODM5NjI5LCJleHAiOjE2MTg5MjYwMjl9.PUBkiBRThuEoXRvq3Cozoc_GxFw7qO22so5tzwDeO7k';
const socket = io('http://localhost:3000', { auth: { token } });

socket
  .on('connect', () => {
    console.log('CONNECT');
    socket.send({
      message: 'Client connected',
      room: 'TestRoom',
    });
  })
  .on('error', (error) => {
    console.log('ERROR', error);
  })
  .on('disconnect', (reason) => {
    console.log('DISCONNECT', reason);
  })
  .on('unauthorized', (err) => {
    console.log('There was an error with the authentication:', err);
  })
  .on('exception', (err) => {
    console.log('Exception:', err);
  })
  .on('message', (data) => console.log('message received: ', data));
