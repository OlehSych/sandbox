export default class LinkedListNode {
  constructor(val) {
    this.value = val;
    this.next = null;
  }

  getTail() {
    let tail = this;

    while (tail.next) {
      tail = tail.next;
    }

    return tail;
  }
}
