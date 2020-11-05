import LinkedList from '../src/linkedList';

const testList = new LinkedList().add(2)
  .add(3)
  .add(4);

console.log(testList.get(1));
//
// describe('Test linked list implementation', () => {
//   let testList;
//
//   beforeEach(() => {
//     testList = new LinkedList().add(2).add(3).add(4);
//   });
//
//   it('Should add new node in the middle of list', () => {
//     const index = 2;
//     const value = 5;
//     const { length } = testList;
//     testList.add(value, index);
//     expect(testList[index]).toEqual(value);
//     expect(testList.length).toEqual(length + 1);
//   });
//
//   it('Should delete nodes by value', () => {
//     const expectedLength = 2;
//     expect(testList.delete(3).length).toEqual(expectedLength);
//     expect(testList.includes(3)).toBeFalsy();
//     expect(testList.delete(2).delete(4).head).toBeNull();
//   });
//
//   it('Should delete node by index', () => {
//     const expectedLength = 2;
//     expect(testList.deleteIndex(0).length).toEqual(expectedLength);
//     expect(testList.includes(2)).toBeFalsy();
//     expect(testList.deleteIndex(1).deleteIndex(0).head).toBeNull();
//   });
//
//   it('Should find node by condition', () => {
//     const isOddNumber = num => num % 2;
//     expect(testList.find(isOddNumber)).toEqual(3);
//   });
//
//   it('Should iterate nodes', () => {
//     // eslint-disable-next-line no-restricted-syntax
//     for (const item of testList) {
//       console.log(item);
//     }
//     testList.add(2).add(3).add(4);
//     const isOddNumber = num => num % 2;
//     expect(testList.find(isOddNumber)).toEqual(3);
//   });
// });

class BaseModel {
  constructor(attr) {
    this.attr = attr;

  }

  getValue(name) {
    return this.attr[name] || '';
  }

  setValue(name, value) {
    this.attr[name] = value;
  }
}
// TODO: implement indexers in linkedList

const p = new Proxy(new BaseModel(), {
  get: (target, name) => target.getValue(<string>name),
  set: (target, name, value) => {
    target.setValue(name, value);
    return true;
  },
});
