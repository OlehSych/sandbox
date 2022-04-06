export default class LinkedListIterator {
  constructor(list) {
    this.currentItem = list.head;
  }

  next() {
    if (!this.currentItem) {
      return { done: true };
    }
    const res = {
      value: this.currentItem.value,
      done: false,
    };
    this.currentItem = this.currentItem.next;
    return res;
  }
}
