import LinkedListNode from './linkedListNode';

/*
Following are the basic operations supported by a list:
Insertion − Adds an element at the beginning of the list.
Deletion − Deletes an element at the beginning of the list.
Display − Displays the complete list.
Search − Searches an element using the given key.
Delete − Deletes an element using the given key.
 */

function validateFunction(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Given parameter is not a function');
  }
}

function validateIndex(i, length) {
  if (i !== Math.floor(i)) {
    throw new Error('Node index must be integer');
  }

  if (i < 0 || i > length) {
    throw new Error('Out of range index');
  }
}

class LinkedListIterator {
  constructor(list) {
    this.currentItem = list.head;
  }

  next() {
    if (!this.currentItem) {
      return { done: true };
    }
    const res = { value: this.currentItem.value, done: false };
    this.currentItem = this.currentItem.next;
    return res;
  }
}

export default class LinkedList {
  constructor() {
    Object.defineProperty(this, 'head', { writable: true });
    this.head = null;
    this.length = 0;
  }

  [Symbol.iterator]() {
    return new LinkedListIterator(this);
  }

  get(idx) {
    // TODO: implement get by index
    validateIndex(idx, this.length - 1);
    return this.stations[idx];
  }

  forEach(fn) {
    validateFunction(fn);

    for (let node = this.head; node !== null; node = node.next) {
      fn(node.value);
    }
  }

  map(fn) {
    validateFunction(fn);

    const results = [];

    for (let node = this.head; node !== null; node = node.next) {
      results.push(fn(node.value));
    }

    return results;
  }

  find(fn) {
    validateFunction(fn);

    for (let node = this.head; node !== null; node = node.next) {
      if (fn(node.value)) {
        return node.value;
      }
    }
    return undefined;
  }

  includes(val) {
    return !!this.find(v => v === val);
  }

  add(val, i = this.length) {
    validateIndex(i, this.length);

    const newNode = new LinkedListNode(val);

    if (i === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else if (i === this.length) {
      this.head.getTail().next = newNode;
    } else {
      for (let j = 1, currNode = this.head; j <= i; j++, currNode = currNode.next) {
        if (j === i) {
          newNode.next = currNode.next;
          currNode.next = newNode;
          break;
        }
      }
    }

    this.length += 1;
    return this;
  }

  delete(val, all = false) {
    if (this.head) {
      if (this.head.value === val) {
        this.head = this.head.next;
        this.length -= 1;
      } else {
        for (let node = this.head; node !== null; node = node.next) {
          if (node.next && node.next.value === val) {
            node.next = node.next.next;
            this.length -= 1;
            if (!all) {
              break;
            }
          }
        }
      }
    }
    return this;
  }

  deleteIndex(i) {
    validateIndex(i, this.length - 1);

    if (this.head) {
      if (i === 0) {
        this.head = this.head.next;
        this.length -= 1;
      } else {
        for (let node = this.head, j = 1; node !== null; node = node.next, j++) {
          if (i === j) {
            node.next = node.next.next;
            this.length -= 1;
            break;
          }
        }
      }
    }
    return this;
  }

  deleteNode(ctx, node) {
    // TODO: optimize delete node
    node = node.next;
    this.length -= 1;
  }
}
