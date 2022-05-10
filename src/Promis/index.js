import PromisList from './PromisList';
import ResolveListNode from './ResolveListNode';
import RejectListNode from './RejectListNode';
import FinallyListNode from './FinallyListNode';

export default class Promis {
  constructor(fn) {
    Object.defineProperties(this, {
      callbacks: { value: new PromisList() },
      resolve: {
        value: (data) => {
          this.result = data;
          const callback = this.callbacks
            .deleteTill((node) => node instanceof RejectListNode)
            .shift();

          if (!callback) {
            this.state = Promis.states.resolved;
            return;
          }

          if (callback instanceof ResolveListNode) {
            try {
              this.resolve(callback(this.result));
            } catch (err) {
              this.reject(err);
            }
          } else {
            callback();
            this.resolve(this.result);
          }
        },
      },
      reject: {
        value: (data) => {
          this.result = data;
          const callback = this.callbacks
            .deleteTill((node) => node instanceof ResolveListNode)
            .shift();

          if (!callback) {
            this.state = Promis.states.rejected;
            throw this.result;
          }

          if (callback instanceof RejectListNode) {
            try {
              this.resolve(callback(this.result));
            } catch (err) {
              this.reject(err);
            }
          } else {
            callback();
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
    this.callbacks.add(new ResolveListNode(fn));
    return this;
  }

  catch(fn) {
    this.callbacks.add(new RejectListNode(fn));
    return this;
  }

  finally(fn) {
    this.callbacks.add(new FinallyListNode(fn));
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
    return new Promis((resolve) => process.nextTick(resolve(data)));
  }

  static reject(data) {
    return new Promis((_, reject) => process.nextTick(reject(data)));
  }

  static get states() {
    return {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    };
  }
}
