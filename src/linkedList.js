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

export default class LinkedList {
  constructor() {
    Object.defineProperty(this, 'head', { writable: true });
    this.head = null;
    this.length = 0;
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

  delete(val) {
    if (this.head) {
      if (this.head.value === val) {
        this.head = this.head.next;
      } else {
        for (let node = this.head; node !== null; node = node.next) {
          if (node.next && node.next.value === val) {
            node.next = node.next.next;
            this.length -= 1;
            break;
          }
        }
      }
    }
    return this;
  }

  deleteIndex(i) {
    validateIndex(i, this.length);
    // TODO implement delete node by index
  }
}
