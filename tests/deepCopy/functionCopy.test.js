import deepCopy from '../../src/deepCopy';

describe('Validate deepCopy child functions copying', () => {
  let animal;

  beforeEach(() => {
    animal = {
      age: 10,
      getAge() {
        return this.age;
      },
    };
  });

  it('Should copy functions', () => {
    const cat = deepCopy(animal);
    delete animal.getAge;
    cat.age = 3;
    expect(cat.getAge()).toBe(cat.age);
  });
});
