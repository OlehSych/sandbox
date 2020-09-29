import deepCopy from '../src/deepCopy';

describe('Validate deepCopy function', () => {
  let animal;

  beforeEach(() => {
    animal = {
      name: 'animal',
      age: 10,
      childs: ['child 1', 'child 2'],
      needs: {
        eat: 'meat',
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
  // TODO: check deep nesting
  it('Should create new child arrays', () => {
    const cat = deepCopy(animal);
    cat.childs.push('child 3');
    expect(cat.childs).not.toBe(animal.childs);
  });

  it('Should create new child functions', () => {
  });
});
