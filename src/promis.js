export default class Promis {
  constructor(fn) {
    Object.defineProperties(this, {
      resolveFns: {
        enumerable: false,
        value: [],
      },
      rejectFns: {
        enumerable: false,
        value: [],
      },
      finallyFns: {
        enumerable: false,
        value: [],
      },
    });
    this.state = Promis.states.pending;
    this.result = undefined;

    try {
      fn((data) => {
        this.state = Promis.states.fulfilled;
        this.result = data;
      });
    } catch (err) {
      this.state = Promis.states.rejected;
      this.result = err;
      throw new Error(err);
    } finally {
    }
  }

  then(fn) {
    this.resolveFns.push(fn);
  }

  catch(fn) {
    this.rejectFns.push(fn);
  }

  finally(fn) {
    this.finallyFns.push(fn);
  }

  static all(promisArr) {

  }

  static allSettled(promisArr) {

  }

  static any(promisArr) {

  }

  static race(promisArr) {

  }

  static resolve(data) {
    this.state = Promis.states.fulfilled;
    this.result = data;
  }

  static reject(err) {
    this.state = Promis.states.rejected;
    this.result = err;
    throw new Error(err);
  }

  static get states() {
    return {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    };
  }
}
