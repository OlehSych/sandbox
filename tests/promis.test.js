import Promis from '../src/promis';

// describe('Test custom promise implementation', () => {
//   it('Should ', () => {
//   });
// });

const test = new Promis((resolve) => {
  setTimeout(() => {
    resolve('test');
  }, 2000);
});
console.log(test);

test
  .then((data) => {
    console.log('UNBELIEVABLE>>>>>', data);
    return 'amazing';
  })
  .then(data => console.log('UNBELIEVABLE>>>>>', data) || data);

setTimeout(() => {
  console.log(test);
}, 2000);
