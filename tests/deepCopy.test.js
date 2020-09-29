import deepCopy from '../src/deepCopy';

describe('Validate deepCopy function', () => {
  let animal;

  beforeEach(() => {
    animal = {
      name: 'animal',
      age: 10,
      childs: ['child 1', 'child 2'],
    };
  });

  it('Should create new object', () => {
    const anotherAnimal = deepCopy(animal);
    expect(anotherAnimal).not.toBe(animal);
  });

  it('Should create new child objects and arrays', () => {
    const cat = deepCopy(animal);
    cat.childs.push('child 3');
    expect(cat.childs).not.toBe(animal.childs);
  });
});
