import LinkedList from '../src/linkedList';

describe('Test linked list implementation', () => {
  let testList;

  beforeEach(() => {
    testList = new LinkedList().add(2).add(3).add(4);
  });

  it('Should add new nodes in the middle of linked list', () => {
    const index = 2;
    const value = 5;
    const { length } = testList;
    testList.add(value, index);
    expect(testList[index]).toEqual(value);
    expect(testList.length).toEqual(length + 1);
  });

  it('Should delete nodes from linked list', () => {
    const expectedLength = 2;
    expect(testList.delete(3).length).toEqual(expectedLength);
    expect(testList.includes(3)).toBeFalsy();
    expect(testList.delete(2).delete(4).head).toBeNull();
  });

  it('Should find item in linked list', () => {
    testList.add(2).add(3).add(4);
    const isOddNumber = num => num % 2;
    expect(testList.find(isOddNumber)).toEqual(3);
  });
});
