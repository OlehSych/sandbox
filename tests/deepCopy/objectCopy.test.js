import deepCopy from '../../src/deepCopy';

describe('Validate deepCopy fn objects copying', () => {
  let animal;

  beforeEach(() => {
    animal = {
      name: 'animal',
      age: 10,
      children: [{ name: 'child 1' }, 'child 2'],
      needs: {
        eat: ['meat', 'fish'],
        drink: 'water',
      },
      getAge: () => this.age,
    };
  });

  it('Should create new object', () => {
    const anotherAnimal = deepCopy(animal);
    expect(anotherAnimal).not.toBe(animal);
  });

  it('Should create new child objects', () => {
    const cat = deepCopy(animal);
    cat.needs.drink = 'milk';
    expect(cat.needs).not.toBe(animal.needs);
  });

  it('Should create new child objects inside child arrays', () => {
    const cat = deepCopy(animal);
    expect(cat.children[0]).not.toBe(animal.children[0]);
  });
});
