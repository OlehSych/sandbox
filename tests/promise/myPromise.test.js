import MyPromise from '../../src/promise/MyPromise';
// const MyPromise = Promise;

const DEFAULT_VALUE = 'default';

function it(description, fn) {
  test(description, () => {
    expect.hasAssertions();
    return fn();
  });
}

function promise({ value = DEFAULT_VALUE, fail = false } = {}) {
  return new MyPromise((resolve, reject) => (fail ? reject(value) : resolve(value)));
}
// TODO: cover 100% code with tests
describe('Test MyPromise class', () => {
  describe('then', () => {
    it('with no chaining', () => promise().then((v) => expect(v).toEqual(DEFAULT_VALUE)));

    it('with multiple thens for same promise', () => {
      const checkFunc = (v) => expect(v).toEqual(DEFAULT_VALUE);
      const mainPromise = promise();
      const promise1 = mainPromise.then(checkFunc);
      const promise2 = mainPromise.then(checkFunc);
      return Promise.allSettled([promise1, promise2]);
    });

    it('with then and catch', () => {
      const checkFunc = (v) => expect(v).toEqual(DEFAULT_VALUE);
      const failFunc = (v) => expect(1).toEqual(2);
      const resolvePromise = promise().then(checkFunc, failFunc);
      const rejectPromise = promise({ fail: true }).then(failFunc, checkFunc);
      return Promise.allSettled([resolvePromise, rejectPromise]);
    });

    it('with chaining', () => promise({ value: 3 })
      .then((v) => v * 4)
      .then((v) => expect(v).toEqual(12)));
  });

  describe('catch', () => {
    it('with no chaining', () => promise({ fail: true }).catch((v) => expect(v).toEqual(DEFAULT_VALUE)));

    it('with multiple catches for same promise', () => {
      const checkFunc = (v) => expect(v).toEqual(DEFAULT_VALUE);
      const mainPromise = promise({ fail: true });
      const promise1 = mainPromise.catch(checkFunc);
      const promise2 = mainPromise.catch(checkFunc);
      return Promise.allSettled([promise1, promise2]);
    });

    it('with chaining', () => promise({ value: 3 })
      .then((v) => {
        throw v * 4;
      })
      .catch((v) => expect(v).toEqual(12)));
  });

  describe('finally', () => {
    it('with no chaining', () => {
      const checkFunc = (v) => expect(v).toBeUndefined();
      const successPromise = promise().finally(checkFunc);
      const failPromise = promise({ fail: true }).finally(checkFunc);
      return Promise.allSettled([successPromise, failPromise]);
    });

    it('with multiple finallys for same promise', () => {
      const checkFunc = (v) => expect(v).toBeUndefined();
      const mainPromise = promise();
      const promise1 = mainPromise.finally(checkFunc);
      const promise2 = mainPromise.finally(checkFunc);
      return Promise.allSettled([promise1, promise2]);
    });

    it('with chaining', () => {
      const checkFunc = (v) => expect(v).toBeUndefined();
      const successPromise = promise()
        .then((v) => v)
        .finally(checkFunc);
      const failPromise = promise({ fail: true })
        .then((v) => v)
        .finally(checkFunc);
      return Promise.allSettled([successPromise, failPromise]);
    });
  });

  describe('static methods', () => {
    it('resolve', () => MyPromise.resolve(DEFAULT_VALUE).then((v) => expect(v).toEqual(DEFAULT_VALUE)));

    it('reject', () => MyPromise.reject(DEFAULT_VALUE).catch((v) => expect(v).toEqual(DEFAULT_VALUE)));

    describe('all', () => {
      it('with success', () => MyPromise.all([promise({ value: 1 }), promise({ value: 2 })]).then(
        (v) => expect(v).toEqual([1, 2]),
      ));

      it('with fail', () => MyPromise.all([promise(), promise({ fail: true })]).catch((v) => expect(v).toEqual(DEFAULT_VALUE)));
    });

    it('allSettled', () => MyPromise.allSettled([promise(), promise({ fail: true })]).then((v) => expect(v).toEqual([
      { status: 'fulfilled', value: DEFAULT_VALUE },
      { status: 'rejected', reason: DEFAULT_VALUE },
    ])));

    describe('race', () => {
      it('with success', () => MyPromise.race([
        promise({ value: 1 }),
        promise({ value: 2 }),
      ]).then((v) => expect(v).toEqual(1)));

      it('with fail', () => MyPromise.race([
        promise({ fail: true, value: 1 }),
        promise({ fail: true, value: 2 }),
      ]).catch((v) => expect(v).toEqual(1)));
    });

    describe('any', () => {
      it('with success', () => MyPromise.any([promise({ value: 1 }), promise({ value: 2 })]).then(
        (v) => expect(v).toEqual(1),
      ));

      it('with fail', () => MyPromise.any([
        promise({ fail: true, value: 1 }),
        promise({ fail: true, value: 2 }),
      ]).catch((e) => expect(e.errors).toEqual([1, 2])));
    });
  });
});
