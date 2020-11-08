import LinkedList from './linkedList';

export default class LinkedListIndexers {
  constructor() {
    return new Proxy(new LinkedList(), {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop];
        }
        const index = Number(prop);
        return Number.isNaN(index)
          ? undefined
          : target.get(index);
      },
      set: (target, prop, value) => {
        const index = Number(prop);
        if (Number.isNaN(index)) {
          // eslint-disable-next-line no-param-reassign
          target[prop] = value;
        } else {
          target.add(value, index);
        }
        return true;
      },
    });
  }
}
