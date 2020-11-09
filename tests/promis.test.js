import Promis from '../src/promis';

describe('Test custom promise implementation', () => {
  it('Should resolve promise after timeout', () => {
    const testStr = 'test';
    expect.assertions(1);
    return new Promis((resolve) => {
      setTimeout(() => {
        resolve(testStr);
      }, 2000);
    }).then(data => expect(data).toBe(testStr));
  });

  it('Should execute promise chaining', () => {
    const test1Str = 'test1';
    const test2Str = 'test2';
    const test3Str = 'test3';
    // TODO: debug why promise isn't working
    return Promis
      .resolve(test1Str)
      .then((data) => {
        expect(data).toBe(test1Str);
        return test2Str;
      })
      .then((data) => {
        expect(data).toBe(test2Str);
        return test3Str;
      })
      .then(data => expect(data).toBe(test3Str));
  });
});
