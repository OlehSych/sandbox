import fs from 'fs';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

// There are two microtasks: process.nextTick callbacks and promise callbacks
// Process.nextTick will be executed at first
// Then promise callbacks
//
// Macrotasks:
//
// Timers (setTimeout, setInterval)
// Pending callbacks: executes cb from OS as types of TCP errors (ECONNREFUSED, etc.)
//        (executes error I/O callbacks, but not the successful I/O callbacks);
// Idle/Prepare
// Poll: retrieve new I/O events, execute I/O related callbacks
//       (almost all with the exception of close cb, timers, and setImmediate);
//       (put successful I/O callbacks in "Pending callbacks" queue);
// setImmediate callbacks
// Close callbacks - executes close callbacks: process.on('exit'), socket.on('close)
//
// ES module event loop VS CommonJS event loop
// CommonJS event loop - works as described in Node.js documentation
// ES module event loop order:
// promises
// nextTick
// setImmediate
// setTimeout
// I/O callbacks
// Node js checks microtask queues between executing callbacks in one of its phases

process.on('exit', (code) => {
  console.log('Close callback >>>>>', code);
  Promise.resolve().then(() => console.log('Promise 3'));
});

setImmediate(() => console.log('setImmediate 1'));

fs.readFile(filename, (err) => {
  console.log('Read file >>>>>', err);

  setTimeout(() => console.log('setTimeout 2'), 0);

  process.nextTick(() => console.log('process.nextTick 2'));

  setImmediate(() => {
    console.log('setImmediate 2');
    process.nextTick(() => console.log('process.nextTick 3'));
  });

  setImmediate(() => console.log('setImmediate 2.2'));

  Promise.resolve().then(() => console.log('Promise 2'));
});

setTimeout(() => {
  console.log('setTimeout 1');
  setImmediate(() => console.log('setImmediate 1.1.1'));
});

process.nextTick(() => console.log('process.nextTick 1'));

Promise.resolve().then(() => console.log('Promise 1'));

process.nextTick(() => console.log('process.nextTick 1.1'));

setImmediate(() => console.log('setImmediate 1.1'));

Promise.resolve().then(() => {
  Promise.resolve().then(() => console.log('Promise 1.1'));
  process.nextTick(() => console.log('process.nextTick 1.2'));
});

const now = Date.now();
// eslint-disable-next-line no-empty
while (Date.now() - now < 5000) { /* this is needed to guarantee readFile fn will be finished */ }
