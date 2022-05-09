import LinkedListNode from './linkedListNode';
import LinkedListIterator from './linkedListIterator';

function validateFunction(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Given parameter is not a function');
  }
}

function validateIndex(i, length) {
  if (!Number.isInteger(i)) {
    throw new TypeError('Node index must be integer');
  }

  if (i < 0 || i > length) {
    throw new RangeError('Out of range index');
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

  get(i) {
    if (!Number.isInteger(i) || i < 0 || i >= this.length) {
      return undefined;
    }

    let node = this.head;
    let j = 0;

    while (i !== j) {
      node = node.next;
      j += 1;
    }

    return node.value;
  }

  filter(fn) {
    validateFunction(fn);

    for (let node = this.head; node !== null; node = node.next) {
      if (!fn(node.value)) {
        this.delete(node.value);
      }
    }

    return this;
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

  indexOf(val) {
    for (let node = this.head, index = 0; node !== null; node = node.next, index += 1) {
      if (node.value === val) {
        return index;
      }
    }

    return -1;
  }

  includes(val) {
    for (let node = this.head; node !== null; node = node.next) {
      if (node.value === val) {
        return true;
      }
    }
    return false;
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
        if (i === j) {
          newNode.next = currNode.next;
          currNode.next = newNode;
          break;
        }
      }
    }

    this.length += 1;
    return this;
  }

  delete(val) {
    if (this.head && this.head.value === val) {
      this.head = this.head.next;
      this.length -= 1;
      return this;
    }

    for (let node = this.head; node !== null; node = node.next) {
      if (node.next && node.next.value === val) {
        node.next = node.next.next;
        this.length -= 1;
        break;
      }
    }

    return this;
  }

  deleteIndex(i) {
    validateIndex(i, this.length - 1);

    if (i === 0) {
      this.head = this.head.next;
    } else {
      for (let node = this.head, j = 1; node !== null; node = node.next, j++) {
        if (i === j) {
          node.next = node.next.next;
          break;
        }
      }
    }
    this.length -= 1;
    return this;
  }

  shift() {
    if (this.head) {
      const res = this.head.value;
      this.head = this.head.next;
      this.length -= 1;
      return res;
    }

    return undefined;
  }
}
