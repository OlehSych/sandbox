import CallbackList from './CallbackList';
import {
  ResolveCallback,
  RejectCallback,
  FinallyCallback,
} from './callbacks';

export default class Promis {
  constructor(fn) {
    Object.defineProperties(this, {
      callbacks: { value: new CallbackList() },
      resolve: {
        value: (data) => {
          this.result = data;
          const callback = this.callbacks
            .deleteTill((cb) => cb instanceof RejectCallback)
            .shift();

          if (!callback) {
            this.state = Promis.states.resolved;
            return;
          }

          if (callback instanceof ResolveCallback) {
            try {
              this.resolve(callback.execute(this.result));
            } catch (err) {
              this.reject(err);
            }
          } else {
            callback.execute();
            this.resolve(this.result);
          }
        },
      },
      reject: {
        value: (data) => {
          this.result = data;
          const callback = this.callbacks
            .deleteTill((node) => node instanceof ResolveCallback)
            .shift();

          if (!callback) {
            this.state = Promis.states.rejected;
            throw this.result;
          }

          if (callback instanceof RejectCallback) {
            try {
              this.resolve(callback.execute(this.result));
            } catch (err) {
              this.reject(err);
            }
          } else {
            callback.execute();
            this.reject(this.result);
          }
        },
      },
    });
    this.state = Promis.states.pending;
    this.result = undefined;

    process.nextTick(() => fn(this.resolve.bind(this), this.reject.bind(this)));
  }

  then(fn) {
    this.callbacks.add(new ResolveCallback(fn));
    return this;
  }

  catch(fn) {
    this.callbacks.add(new RejectCallback(fn));
    return this;
  }

  finally(fn) {
    this.callbacks.add(new FinallyCallback(fn));
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
