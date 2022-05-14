export default class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);
    this.stack = `(in promise) ${this.stack}`;
  }
}
