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

  it('Should copy functions', () => {
    const cat = deepCopy(animal);
    delete animal.getAge;
    expect(cat.getAge()).toBe(animal.age);
  });
});
