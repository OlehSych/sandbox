export default class Promis {
  static constructor() {
    this.states = {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    };
  }

  constructor(fn) {
    this.resolveFns = [];
    this.rejectFns = [];
    this.finallyFns = [];

    try {
      this.state = Promis.states.pending;
      fn(Promis.resolve, Promis.reject);
    } catch (e) {

    } finally {

    }
  }

  then() {

  }

  catch() {

  }

  finally() {

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
    this.state = Promis.states.resolved;
    this.result = data;
  }

  static reject(err) {
    this.state = Promis.states.rejected;
    this.result = err;
    throw new Error(err);
  }
}

// check process next tick is microtask or not
// check child process creates in the same thread or not
