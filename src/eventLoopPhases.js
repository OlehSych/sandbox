const fs = require('fs');

// There are two microtasks: promise callbacks and process.nextTick callbacks
// Promise callbacks will be executed at first
// Then process.nextTick
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

function main() {
  setTimeout(() => console.log('1'), 0);
  setImmediate(() => console.log('2'));
  process.nextTick(() => {
    console.log('process.nextTick 1');
  });
  const p1 = new Promise((r) => {
    console.log('Promise 1');
    r();
  });
  p1.then(() => console.log('Promise 1 then'));

  fs.readFile('./isObject.js', () => {
    setTimeout(() => {
      console.log('3');
    }, 1000);

    process.nextTick(() => {
      console.log('process.nextTick 2');
    });

    setImmediate(() => console.log('4'));

    const p4 = new Promise((r) => {
      console.log('Promise 4');
      r();
    });
    p4.then(() => console.log('Promise 4 then'));
  });

  setImmediate(() => console.log('5'));

  setTimeout(() => {
    process.on('exit', () => {
      console.log('close callback');
      const p3 = new Promise((r) => {
        console.log('Promise 3');
        r();
      });
      p3.then(() => console.log('Promise 3 then'));
    });
  }, 1100);

  const p2 = new Promise((r) => {
    console.log('Promise 2');
    r();
  });
  p2.then(() => console.log('Promise 2 then'));
}

main();
