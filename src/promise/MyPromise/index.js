import UncaughtPromiseError from './UncaughtPromiseError';

const STATES = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  PENDING: 'pending',
};

export default class MyPromise {
  #thenCbs = [];

  #catchCbs = [];

  #state = STATES.PENDING;

  #value;

  #onSuccessBind = this.#onSuccess.bind(this);

  #onFailBind = this.#onFail.bind(this);

  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch (err) {
      this.#onFail(err);
    }
  }

  #runCallbacks() {
    if (this.#state === STATES.FULFILLED) {
      this.#thenCbs.forEach((cb) => {
        cb(this.#value);
      });

      this.#thenCbs = [];
    }

    if (this.#state === STATES.REJECTED) {
      this.#catchCbs.forEach((cb) => {
        cb(this.#value);
      });

      this.#catchCbs = [];
    }
  }

  #onSuccess(value) {
    process.nextTick(() => {
      if (this.#state !== STATES.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      this.#value = value;
      this.#state = STATES.FULFILLED;
      this.#runCallbacks();
    });
  }

  #onFail(value) {
    process.nextTick(() => {
      if (this.#state !== STATES.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      if (!this.#catchCbs.length) {
        throw new UncaughtPromiseError(value);
      }

      this.#value = value;
      this.#state = STATES.REJECTED;
      this.#runCallbacks();
    });
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (!thenCb) {
          resolve(result);
          return;
        }

        try {
          resolve(thenCb(result));
        } catch (err) {
          reject(err);
        }
      });

      this.#catchCbs.push((result) => {
        if (!catchCb) {
          reject(result);
          return;
        }

        try {
          resolve(catchCb(result));
        } catch (err) {
          reject(err);
        }
      });

      this.#runCallbacks();
    });
  }

  catch(cb) {
    return this.then(null, cb);
  }

  finally(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
      },
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    return new MyPromise((_, reject) => reject(value));
  }

  static all(promises) {
    const results = [];
    let completed = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, i) => {
        promise
          .then((value) => {
            completed += 1;
            results[i] = value;
            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  }

  static allSettled(promises) {
    const results = [];
    let completed = 0;
    return new MyPromise((resolve) => {
      promises.forEach((promise, i) => {
        promise
          .then((value) => {
            results[i] = { status: STATES.FULFILLED, value };
          })
          .catch((reason) => {
            results[i] = { status: STATES.REJECTED, reason };
          })
          .finally(() => {
            completed += 1;
            if (completed === promises.length) {
              resolve(results);
            }
          });
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve).catch(reject);
      });
    });
  }

  static any(promises) {
    const errors = [];
    let rejected = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, i) => {
        promise
          .then(resolve)
          .catch((value) => {
            rejected += 1;
            errors[i] = value;
            if (rejected === promises.length) {
              const err = new Error(errors.toString());
              err.errors = errors;
              reject(err);
            }
          });
      });
    });
  }
}
