import LinkedList from '../linkedList/LinkedList';

export default class PromisList extends LinkedList {
  deleteTill(fn) {
    while (this.head && fn(this.head)) {
      this.head = this.head.next;
      this.length -= 1;
    }

    return this;
  }
  // TODO: implement identifying shifted fn type
  checkHeadInstanceType(type) {
    return this.head instanceof type;
  }
}
