export default class LinkedListIterator {
  constructor(list) {
    this.currentItem = list.head;
  }

  next() {
    if (!this.currentItem) {
      return { done: true };
    }
    const { value } = this.currentItem;
    this.currentItem = this.currentItem.next;

    return { value, done: false };
  }
}
