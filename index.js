Promise.reject('test 1')
  // .catch((err) => console.log('ERROR 1', err))
  .finally(() => {
    console.log('finally1');
    throw 'finally err';
  })
  .catch((err) => {
    console.log('ERROR 1', err);
    throw err;
  })
  .then((data) => console.log('then1', data))
  .finally(() => console.log('finally2'))
  .then((data) => {
    console.log('then2', data);
    throw 'test 2';
  })
  .catch((err) => console.log('ERROR 2', err));
