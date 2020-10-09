export default class Promis {
  constructor(fn) {
    this.statuses = {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    };
    this.resolveFns = [];
    this.rejectFns = [];
    this.finallyFns = [];

    try {
      this.currentStatus = this.statuses.pending;
      const result = fn(this.resolve, this.reject);
    } catch (e) {

    } finally {

    }
    return result;
  }

  then() {

  }

  catch() {

  }

  finally() {

  }

  resolve(data) {
    this.currentStatus = this.statuses.resolved;
    return data;
  }

  reject(err) {
    this.currentStatus = this.statuses.rejected;
    throw new Error(err);
  }
}

// check process next tick is microtask or not
// check child process creates in the same thread or not
