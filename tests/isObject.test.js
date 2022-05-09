import isObject from '../src/isObject';
import Tester from '../src/testClass';

describe('Test isObject function', () => {
  it('Should return true if pass the object', () => {
    const name = 'Bob';
    const age = 10;
    const testObj = { name, age };
    const tester = new Tester(name, age);
    const testDate = new Date();

    expect(isObject(testObj)).toBe(true);
    expect(isObject(tester)).toBe(true);
    expect(isObject(testDate)).toBe(true);
  });

  it('Should return false if pass the array', () => {
    const testArr = ['test1', 'test2'];

    expect(isObject(testArr)).toBe(false);
  });

  it('Should return false if pass the null', () => {
    const test = null;

    expect(isObject(test)).toBe(false);
  });

  it('Should return false if pass the function', () => {
    const test = function test() {
      return 'test';
    };

    function test2() {
      return 'test2';
    }

    expect(isObject(test)).toBe(false);
    expect(isObject(test2)).toBe(false);
  });

  it('Should return false if pass the primitive value', () => {
    const testValues = [
      0,
      1,
      NaN,
      Infinity,
      '',
      'true',
      'test',
      true,
      false,
      undefined,
      Symbol('test'),
    ];

    testValues.forEach((test) => expect(isObject(test)).toBe(false));
  });
});
