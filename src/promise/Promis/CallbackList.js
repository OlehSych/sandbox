import LinkedList from '../../linkedList/LinkedList';

export default class CallbackList extends LinkedList {
  deleteTill(fn) {
    while (this.head && fn(this.head.value)) {
      this.head = this.head.next;
      this.length -= 1;
    }

    return this;
  }
}
