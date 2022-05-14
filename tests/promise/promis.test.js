import Promis from '../../src/promise/Promis';
import CallbackList from '../../src/promise/Promis/CallbackList';
import {
  ResolveCallback,
  RejectCallback,
  FinallyCallback,
} from '../../src/promise/Promis/callbacks';

describe('Test CallbackList with custom callbacks', () => {
  it('Should test deleteTill fn of CallbackList', () => {
    const list = new CallbackList();
    list
      .add(new FinallyCallback(() => 'finally'))
      .add(new FinallyCallback(() => 'finally'))
      .add(new RejectCallback(() => 'reject'))
      .add(new ResolveCallback(() => 'resolve'));

    const cb = list.deleteTill((value) => value instanceof FinallyCallback).shift();

    expect(cb.execute()).toEqual('reject');
    expect(list.length).toEqual(1);
  });
});

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
    const testStr = 'test';
    const testStr2 = 'test2';

    expect.assertions(4);

    Promis.resolve()
      .finally(() => testStr)
      .then((data) => {
        expect(data).toBeUndefined();
        return testStr2;
      })
      .finally(() => testStr)
      .then((data) => {
        expect(data).toEqual(testStr2);
        throw new Error(testStr);
      })
      .catch((err) => expect(err.message).toEqual(testStr))
      .finally((data) => {
        expect(data).toBeUndefined();
        done();
      });
  });

  it('Should handle rejected promise', (done) => {
    const message = 'Some error';

    expect.assertions(2);

    Promis.reject(message)
      .catch((data) => expect(data).toBe(message))
      .finally(() => {
        expect(true).toBe(true);
        done();
      });
  });

  it('Should handle rejected promise from "then"', (done) => {
    const message = 'Some error';

    expect.assertions(2);

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
});
