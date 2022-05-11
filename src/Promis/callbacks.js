/* eslint-disable max-classes-per-file */
class BaseCallback extends Function {
  constructor(cb) {
    super();
    this.cb = cb;
  }

  execute(...args) {
    return this.cb(...args);
  }
}

export class ResolveCallback extends BaseCallback {}

export class RejectCallback extends BaseCallback {}

export class FinallyCallback extends BaseCallback {}

export default {
  ResolveCallback,
  RejectCallback,
  FinallyCallback,
};
