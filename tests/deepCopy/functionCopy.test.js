import deepCopy from '../../src/deepCopy';

describe('Validate deepCopy child functions copying', () => {
  let animal;

  beforeEach(() => {
    animal = {
      name: 'animal',
      age: 10,
      getAge() {
        return this.age;
      },
      getName() {
        return this.name;
      },
    };
  });

  it('Should create new child functions', () => {
    const cat = deepCopy(animal);
    expect(cat.getAge).not.toBe(animal.getAge);

    // TODO implement functionality
  });
});
