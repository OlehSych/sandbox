import deepCopy from '../../src/deepCopy';

describe('Validate deepCopy primitives copying', () => {
  const animal = {
    name: 'animal',
    age: 22,
    isDead: false,
    enemyKilled: Infinity,
    hobby: null,
    futurePlans: undefined,
    sign: Symbol('sign'),
  };

  it('Should create new object', () => {
    const anotherAnimal = deepCopy(animal);
    Object.keys(animal).forEach((prop) => expect(anotherAnimal[prop]).toBe(animal[prop]));
  });
});
