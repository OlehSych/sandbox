import deepCopy from '../src/deepCopy';

describe('Validate deepCopy function', () => {
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

  it('Should create new child arrays', () => {
    const cat = deepCopy(animal);
    cat.children.push('child 3');
    expect(cat.children).not.toBe(animal.children);
  });

  it('Should create new child arrays inside child objects', () => {
    const cat = deepCopy(animal);
    cat.needs.eat.push('mouse');
    expect(cat.needs.eat).not.toBe(animal.needs.eat);
  });

  it('Should create new child objects inside child arrays', () => {
    const cat = deepCopy(animal);
    expect(cat.children[0]).not.toBe(animal.children[0]);
  });

  it('Should create new child functions', () => {
    const cat = deepCopy(animal);
    expect(cat.getAge).not.toBe(animal.getAge);
  });
});
