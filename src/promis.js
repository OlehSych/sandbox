import LinkedList from './linkedList/linkedList';

export default class Promis {
  constructor(fn) {
    Object.defineProperties(this, {
      resolveCallbacks: { value: new LinkedList() },
      rejectCallbacks: { value: new LinkedList() },
      finallyCallbacks: { value: new LinkedList() },
      resolve: {
        value: (data) => {
          this.state = Promis.states.fulfilled;
          this.result = data;
          process.nextTick(() => {
            while (this.resolveCallbacks.length) {
              try {
                this.result = this.resolveCallbacks.shift()(this.result);
              } catch (err) {
                if (!this.rejectCallbacks.length) {
                  this.result = err;
                  throw err;
                }
                this.result = this.rejectCallbacks.shift()(err);
              } finally {
                if (this.finallyCallbacks.length) {
                  this.result = this.finallyCallbacks.shift()(this.result);
                }
              }
            }
            if (this.state === Promis.states.pending) {
              this.state = Promis.states.fulfilled;
            }
          });
        },
      },
      reject: {
        value: (data) => {
          this.state = Promis.states.rejected;
          this.result = data;
          process.nextTick(() => {
            if (!this.rejectCallbacks.length) {
              throw this.result;
            }
            this.result = this.rejectCallbacks.shift()(this.result);
          });
        },
      },
    });
    this.state = Promis.states.pending;
    this.result = undefined;

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(fn) {
    this.resolveCallbacks.add(fn);
    return this;
  }

  catch(fn) {
    this.rejectCallbacks.add(fn);
    return this;
  }

  finally(fn) {
    this.finallyCallbacks.add(fn);
    return this;
  }

  // static all(promisArr) {
  //
  // }
  //
  // static allSettled(promisArr) {
  //
  // }
  //
  // static any(promisArr) {
  //
  // }
  //
  // static race(promisArr) {
  //
  // }

  static resolve(data) {
    return new Promis((resolve) => resolve(data));
  }

  static reject(data) {
    return new Promis((_, reject) => reject(data));
  }

  static get states() {
    return {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    };
  }
}
