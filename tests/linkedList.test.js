import LinkedList from '../src/linkedList';

describe('Test linked list implementation', () => {
  let testList;

  beforeEach(() => {
    testList = new LinkedList().add(2).add(3).add(4);
  });

  it('Should add new node in the middle of list', () => {
    const index = 2;
    const value = 5;
    const { length } = testList;
    testList.add(value, index);
    expect(testList.get(index)).toEqual(value);
    testList[index] = value;
    expect(testList[index]).toEqual(value);
    expect(testList.length).toEqual(length + 2);
  });

  it('Should return true if value is in the list', () => {
    testList.add(0).add(null).add(undefined).add('');
    expect(testList.includes(0)).toBeTruthy();
    expect(testList.includes(null)).toBeTruthy();
    expect(testList.includes(undefined)).toBeTruthy();
    expect(testList.includes('')).toBeTruthy();
  });

  it('Should delete nodes by value', () => {
    const expectedLength = 2;
    expect(testList.delete(3).length).toEqual(expectedLength);
    expect(testList.includes(3)).toBeFalsy();
    expect(testList.delete(2).delete(4).head).toBeNull();
  });

  it('Should delete node by index', () => {
    const expectedLength = 2;
    expect(testList.deleteIndex(0).length).toEqual(expectedLength);
    expect(testList.includes(2)).toBeFalsy();
    expect(testList.deleteIndex(1).deleteIndex(0).head).toBeNull();
  });

  it('Should find node by condition', () => {
    const isOddNumber = num => num % 2;
    expect(testList.find(isOddNumber)).toEqual(3);
  });

  it('Should iterate nodes', () => {
    let i = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of testList) {
      expect(item).toBe(testList[i]);
      i += 1;
    }
    expect(i).toBe(testList.length);
  });
});
