const fs = require('fs');

// There are two microtasks: process.nextTick callbacks and promise callbacks
// Process.nextTick will be executed at first
// Then promise callbacks
//
// Macrotasks:
//
// Timers (setTimeout, setInterval)
// Pending callbacks: executes cb from OS as types of TCP errors (ECONNREFUSED, etc.)
// Idle/Prepare
// Poll: retrieve new I/O events, execute I/O related callbacks
//       (almost all with the exception of close cb, timers, and setImmediate);
// setImmediate callbacks
// Close callbacks - executes close callbacks: process.on('exit'), socket.on('close)

setTimeout(() => console.log('setTimeout 1'));

setImmediate(() => console.log('setImmediate 1'));

process.nextTick(() => console.log('process.nextTick 1'));

Promise.resolve().then(() => console.log('Promise 1'));

fs.readFile(__filename, () => {
  setTimeout(() => console.log('setTimeout 2'), 1000);

  process.nextTick(() => console.log('process.nextTick 2'));

  setImmediate(() => console.log('setImmediate 2'));

  Promise.resolve().then(() => console.log('Promise 2'));
});

setImmediate(() => console.log('setImmediate 3'));

setTimeout(() => process.on('exit', () => {
  console.log('close callback');
  Promise.resolve().then(() => console.log('Promise 3'));
}), 1100);

Promise.resolve().then(() => console.log('Promise 4'));
