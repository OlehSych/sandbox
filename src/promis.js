export default class Promis {
  constructor(fn) {
    Object.defineProperties(this, {
      resolveCallbacks: { value: [] },
      rejectCallbacks: { value: [] },
      finallyCallbacks: { value: [] },
      resolve: {
        value: (data) => {
          this.state = Promis.states.fulfilled;
          this.result = data;
          while (this.resolveCallbacks.length) {
            this.result = this.resolveCallbacks.shift()(this.result);
          }
        },
      },
      reject: {
        enumerable: false,
        value: (err) => {
          this.state = Promis.states.rejected;
          this.result = err;
          while (this.rejectCallbacks.length) {
            this.result = this.rejectCallbacks.shift()(this.result);
          }
          throw new Error(err);
        },
      },
    });
    this.state = Promis.states.pending;
    this.result = undefined;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
    } finally {
    }
  }

  then(fn) {
    this.resolveCallbacks.push(fn);
    return this;
  }

  catch(fn) {
    this.rejectCallbacks.push(fn);
    return this;
  }

  finally(fn) {
    this.finallyCallbacks.push(fn);
    return this;
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
