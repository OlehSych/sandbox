import deepCopy from '../../src/deepCopy';

describe('Validate deepCopy fn objects copying', () => {
  let animal;

  beforeEach(() => {
    animal = {
      children: [{ name: 'child 1' }, 'child 2'],
      needs: {
        eat: ['meat', 'fish'],
        drink: 'water',
      },
    };
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
});
