import LinkedList from '../src/linkedList';
import LinkedListNode from '../src/linkedList/linkedListNode';

describe('Test linked list implementation', () => {
  let testList;

  beforeEach(() => {
    testList = new LinkedList().add(2).add(3).add(4);
  });

  it('Should get node by index', () => {
    const invalidIndex = 'test';
    expect(testList[1]).toEqual(3);
    expect(testList[invalidIndex]).toBeUndefined();
    expect(testList.get(invalidIndex)).toBeUndefined();
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

    expect(() => testList.add(value, 0.52))
      .toThrow(new TypeError('Node index must be integer'));
    expect(() => testList.add(value, testList.length + 1))
      .toThrow(new RangeError('Out of range index'));
  });

  it('Should add new node instance to the list', () => {
    class TestNode extends LinkedListNode {
      constructor({ name, value }) {
        super(value);
        this.name = name;
      }
    }
    const index = 1;
    const value = 44;
    const name = 'test';
    testList.add(new TestNode({ name, value }));
    testList[index] = new TestNode({ name, value });
    expect(testList[index]).toEqual(value);
    expect(testList[testList.length - 1]).toEqual(value);
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

  it('Should filter nodes by fn', () => {
    testList.add(5).add(6).filter((value) => value >= 5);
    expect(testList.length).toEqual(2);
    testList.add(1).add(1).add(3).filter((value) => value !== 1);
    expect(testList.length).toEqual(3);

    expect(() => testList.filter('invalidData'))
      .toThrow(new TypeError('Given parameter is not a function'));
  });

  it('Should delete node by index', () => {
    const expectedLength = 2;
    expect(testList.deleteIndex(0).length).toEqual(expectedLength);
    expect(testList.includes(2)).toBeFalsy();
    expect(testList.deleteIndex(1).deleteIndex(0).head).toBeNull();
  });

  it('Should delete first item and return it', () => {
    const expectedValue = 2;
    const expectedLength = testList.length - 1;
    expect(testList.shift()).toEqual(expectedValue);
    expect(testList.length).toEqual(expectedLength);
    expect(new LinkedList().shift()).toBeUndefined();
  });

  it('Should find node by condition', () => {
    const isOddNumber = (num) => num % 2;
    expect(testList.find(isOddNumber)).toEqual(3);
    testList.delete(3);
    expect(testList.find(isOddNumber)).toBeUndefined();
  });

  it('Should find index of the node by value', () => {
    expect(testList.indexOf(4)).toEqual(2);
    expect(testList.indexOf(228)).toEqual(-1);
  });

  it('Should iterate nodes', () => {
    let i = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of testList) {
      expect(item).toBe(testList[i]);
      i += 1;
    }
    expect(i).toBe(testList.length);

    const arr = Array.from(testList);
    expect(arr.length).toBe(testList.length);
  });
});
