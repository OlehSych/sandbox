import Promis from '../src/promis';

describe('Test custom promise implementation', () => {
  it('Should resolve promise after timeout', (done) => {
    const testStr = 'test';

    expect.hasAssertions();

    new Promis((resolve) => {
      setTimeout(() => {
        resolve(testStr);
      }, 1000);
    }).then((data) => expect(data).toBe(testStr))
      .then(() => done());
  });

  it('Should execute promise chaining', (done) => {
    const test1Str = 'test1';
    const test2Str = 'test2';
    const test3Str = 'test3';

    expect.assertions(3);

    Promis.resolve(test1Str)
      .then((data) => {
        expect(data).toBe(test1Str);
        return test2Str;
      })
      .then((data) => {
        expect(data).toBe(test2Str);
        return test3Str;
      })
      .then((data) => expect(data).toBe(test3Str))
      .then(() => done());
  });

  it('Should handle rejected promise', (done) => {
    const message = 'Some error';

    expect.hasAssertions();

    Promis.reject(message)
      .catch((data) => {
        expect(data).toBe(message);
        done();
      });
  });

  it('Should handle rejected promise from "then"', (done) => {
    const message = 'Some error';

    expect.hasAssertions();

    Promis.resolve()
      .then(() => {
        throw new Error(message);
      })
      .catch((data) => {
        expect(data instanceof Error).toBeTruthy();
        return message;
      })
      .then((data) => {
        expect(data).toEqual(message);
        done();
      });
  });

  it('Should execute finally callback', (done) => {
    const testStr = 'test';

    expect.hasAssertions();

    Promis.resolve(testStr)
      .finally((data) => {
        expect(data).toEqual(testStr);
        done();
      });
  });
});
