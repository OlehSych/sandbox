import { copyFunction } from '../../src/utils';

describe('Validate utils.copyFunction', () => {
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

  it('Should copy function', () => {
    const getAge = copyFunction(animal.getAge);
    const getName = copyFunction(animal.getName);

    // TODO implement functionality
  });
});
