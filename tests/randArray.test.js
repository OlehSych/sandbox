import randArray from '../src/randArray';

describe('Generate array of random numbers', () => {
  const length = 10;
  const minValue = 1;
  const maxValue = 2;
  const invalidLength = Number.MAX_VALUE;
  const invalidScale = -1;

  it('Should throw error if no length param specified', () => {
    expect(() => randArray()).toThrow('Invalid argument exception: length');
  });

  it('Should throw error if too long number specified', () => {
    expect(() => randArray(invalidLength)).toThrow('Invalid argument exception: length');
  });

  it('Should throw error if maximum number is less or equal minimum', () => {
    expect(() => randArray(length, minValue, minValue)).toThrow('Invalid argument exception: max');
    expect(() => randArray(length, maxValue, minValue)).toThrow('Invalid argument exception: max');
  });

  it('Should throw error if scale is less than zero', () => {
    expect(() => randArray(length, minValue, maxValue, invalidScale)).toThrow('Invalid argument exception: scale');
  });

  it('Should create new array with numbers', () => {
    const arr = randArray(length, minValue, maxValue);

    expect(arr.length).toBe(length);
    arr.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(minValue);
      expect(num).toBeLessThanOrEqual(maxValue);
    });
  });
});
