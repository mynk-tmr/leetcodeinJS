class Stack {
  #items = [];
  get items() {
    return [...this.#items].reverse();
  }
  get size() {
    return this.#items.length;
  }
  constructor(...x) {
    this.add(...x);
  }
  add(...x) {
    return this.#items.push(...x);
  }
  remove() {
    return this.#items.pop();
  }
  peek() {
    return this.size ? this.#items.at(-1) : null;
  }
  clear() {
    this.#items = [];
  }
  isEmpty() {
    return !this.size;
  }
}

class Queue {
  #items = {};  //object , not using array for optimisation
  #front = 0; //oldest item index
  #rear = 0; //newest item index
  get items() {
    return Object.values(this.#items);
  }
  get size() {
    return this.#rear - this.#front;
  }
  enqueue(ele) { //to rear
    if (ele == undefined) return;
    this.#items[this.#rear++] = ele;
  }
  dequeue() { // from front
    if (this.isEmpty()) return null;

    const rm = this.#items[this.#front];
    delete this.#items[this.#front++];

    return rm;
  }
  peek() { //at front
    return this.isEmpty() ? null : this.#items[this.#front];
  }
  isEmpty() {
    return !(this.size);
  }
  clear() {
    this.#items = {};
    this.#front = this.#rear = 0;
  }
}

class CircularQueue {
  #capacity = 0;
  #front = 0;
  #rear = -1; //important
  #items = [];

  constructor(capacity) {
    this.#capacity = capacity;
    this.#items = new Array(capacity);
  }

  get items() {
    return Object.values(this.#items);
  }

  get size() {
    return (this.#rear == -1) ? 0 : this.#rear - this.#front + 1;
  }

  isFull() {
    return this.size == this.#capacity;
  }

  isEmpty() {
    return !this.size;
  }

  enqueue(ele) { //to rear
    if (this.isFull()) return;
    this.#rear = ++this.#rear % this.#capacity;
    this.#items[this.#rear] = ele;
  }

  dequeue() { //from front
    if (this.isEmpty()) return null;

    let front = this.#front;
    const rm = this.#items[front];
    delete this.#items[front];
    this.#front = ++front % this.#capacity;

    return rm;
  }
  peek() { //at front
    return this.isEmpty() ? null : this.#items[this.#front];
  }

  clear() {
    this.#items = [];
    this.#front = 0;
    this.#rear = -1;
  }
}

class LinkedList {
  head = null;
  size = 0;

  get items() {
    let list = [], node = this.head;
    while (node) {
      list.push(node.value)
      node = node.next;
    }
    return list;
  }
  at(index) {
    if (index < 0 || index >= this.size) return;
    let node = this.head;
    while (index--) node = node.next;
    return node;
  }
  prepend(value) {
    this.head = { value, next: this.head };
    ++this.size;
  }
  append(value) {
    if (this.size == 0) this.head = { value, next: null };
    else {
      let last = this.at(this.size - 1);
      last.next = { value, next: null };
    }
    ++this.size;
  }
  insertAt(index, value) {
    if (index === 0) return this.prepend(value);
    let prev = this.at(index - 1);
    if(!prev) return;
    let node = { value, next: prev.next };
    prev.next = node;
    ++this.size;
  }
  deleteAt(index) {
    let rm, prev = null;
    if (index < 0 || index >= this.size) return;
    if (index === 0) {
      rm = this.head;
      this.head = this.head.next;
    }
    else {
      prev = this.at(index - 1);
      rm = prev.next;
      prev.next = rm.next;
    }
    --this.size;
    return {...rm, prev}; //to refer to prev
  }
  reverse() {
    let prev = null, curr = this.head, next;
    while (curr) {
      next = curr.next; curr.next = prev; //preserve next, then update
      prev = curr; curr = next; //moving prev, curr forward
    }
    this.head = prev;  //don't forget
  }
  find(value) {
    let node = this.head, i = 0;
    while (node) {
      if (node.value === value) return i;
      node = node.next; i++;
    }
    return null;
  }
}

class LinkedListwithTail extends LinkedList {
  tail = null;
  constructor() {
    super();
  }
  prepend(value) {
    super.prepend(value);
    if (this.size == 1) this.tail = this.head;
  }
  append(value) {
    let node = { value, next: null };
    if (this.size == 0)
      this.head = this.tail = node;
    else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  deleteAt(index) {
    let rm = super.deleteAt(index);
    if (rm == this.tail) this.tail = rm.prev;
    return rm;
  }

  reverse() {
    this.tail = this.head;
    super.reverse();
    this.tail.next = null;
  }
}

class StackList {
  #list = new LinkedList();  //LIST where head -> most recent
  get items() {
    return this.#list.items;
  }
  get size() {
    return this.#list.size;
  }
  add(value) {
    this.#list.prepend(value); //PREPEND
  }
  remove() {
    return this.#list.deleteAt(0).value;
  }
  peek() {
    return this.#list.head.value;
  }
  clear() {
    this.#list = new LinkedList();
  }
  isEmpty() {
    return !this.size;
  }
}

class QueueList {
  #list = new LinkedListwithTail();  // TAIL needed
  get items() {
    return this.#list.items;
  }
  get size() {
    return this.#list.size;
  }
  constructor() { }

  enqueue(value) {
    this.#list.append(value);
  }
  dequeue() {
    return this.#list.deleteAt(0).value;
  }
  peek() { //at front
    return this.#list.head.value;
  }
  isEmpty() {
    return !this.size;
  }
  clear() {
    this.#list = new LinkedListwithTail();
  }
}

class CircularQueueList {
  #capacity = 0;
  #list = new LinkedListwithTail();
  get items() {
    return this.#list.items;
  }
  get size() {
    return this.#list.size;
  }
  constructor(capacity) {
    this.#capacity = capacity;
  }
  isFull() {
    return this.size == this.#capacity;
  }
  isEmpty() {
    return !this.size;
  }
  enqueue(value) {
    if (this.isFull()) return;
    this.#list.append(value);
  }
  dequeue() {
    return this.#list.deleteAt(0).value;
  }
  peek() {
    return this.#list.tail.value;
  }
  clear() {
    this.#list = new LinkedListwithTail();
  }
}

class DoublyList {

}

class Hashtable {
  constructor(maxsize) {
    this.table = new Array(maxsize);
    this.maxsize = maxsize;
    this.size = 0;
  }
  #hash(key) {
    let i, sum = 0;
    for (i in key) sum += key.charCodeAt(i);
    return sum % this.maxsize;
  }
  set(key, value) {
    let index = this.#hash(key);
    let bucket = this.table[index]; //all pairs are put in bucket
    if (!bucket) bucket = [[key, value]];  //if empty bucket, create it
    else {
      let dup_pair = bucket.find(pair => pair[0] === key); //check if bucket has any duplicate
      if (!dup_pair) bucket.push([key, value]);
      else dup_pair[1] = value;
    }
    this.table[index] = bucket; //take back new bucket
    this.size++;
  }
  get(key) {
    let bucket = this.table[this.#hash(key)];
    return bucket?.find(pair => pair[0] === key)[1];
  }
  remove(key) {
    let bucket = this.table[this.#hash(key)];
    if (!bucket) return false;
    let ind = bucket.findIndex(pair => pair[0] === key);
    bucket.splice(ind, 1);
    return --this.size;
  }
  display() {
    for (let i in this.table) {
      let bucket = this.table[i];
      if (bucket.length) console.log(i, '\t', bucket);
    }
  }
}

class BinarySearchTree {
  root = null;
  insert(value) {
    const node = { value, left: null, right: null };
    if (!this.root) this.root = node;
    else _ins(this.root, node);

    function _ins(root, newN) {
      let side = newN.value < root.value? 'left': 'right';
      if(!root[side]) root[side] = newN;
      else _ins(root[side], newN)
    }
  }
  search(value) {
    return _seek(this.root); //seek the node

    function _seek(root) {
      return (root == null) ? false :
        (root.value === value) ? root :
          (value < root.value) ? _seek(root.left) :
            _seek(root.right); 
    }
  }
  depth(node) {
    return _seek(-1, this.root);

    function _seek(dist, root) {
      return (root == null) ? -1 :
        (root.value === node.value) ? dist + 1 :
          (node.value < root.value) ? _seek(dist + 1, root.left) :
            _seek(dist + 1, root.right);
    }
  }
  height(node) {
    if(!node) return -1;
    else return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  dfs_traverse(type, cb, root = this.root) {
    if (!root) return;
    if (type == 'preorder') cb(root.value);
    this.dfs_traverse(type, cb, root.left);
    if (type == 'inorder') cb(root.value);
    this.dfs_traverse(type, cb, root.right);
    if (type == 'postorder') cb(root.value);
  }
  bfs_traverse(callback) {
    const queue = [this.root];
    while (queue.length) {
      let curr = queue.shift();
      callback(curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }
  minmax(root = this.root) {
    const min = (root) => root.left ? min(root.left) : root.value;
    const max = (root) => root.right ? max(root.right) : root.value;
    return [min(root), max(root)];
  }
  delete(value) {
    var _del = (root, value) => { //arrow needed
      if (!root) return null;
      else if (value < root.value) root.left = _del(root.left, value);
      else if (value > root.value) root.right = _del(root.right, value);
      else {  //value found
        if (!root.left && !root.right) return null; //leaf node
        if (!root.left) return root.right; //1 right-child
        if (!root.right) return root.left; //1 left-child

        //2 children
        root.value = this.minmax(root.right)[0];  //make min of right subtree as root
        root.right = _del(root.right, root.value); //delete that node.
      }
      return root;
    };
    this.root = _del(this.root, value);
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

class BalancedBST extends BinarySearchTree {
  constructor() { super(); }
  buildTree(arr) {
    arr = [...new Set(arr.sort((a, b) => a - b))];
    this.root = _build(arr);

    function _build(arr) {  //subroot is always middle of subarray
      if (arr.length == 0) return null;
      let mid = Math.floor(arr.length / 2);
      let root = { value: arr[mid] };
      root.left = _build(arr.slice(0, mid));
      root.right = _build(arr.slice(mid + 1, arr.length));
      return root;
    }
  }
  levelOrder(cb) { //call cb on each value, else return array of values
    let arr = [];
    cb ??= (x) => arr.push(x)
    this.bfs_traverse(cb);
    if (arr) return arr;
  }
  isBalanced(root = this.root) {
    if (!root) return true;
    let diffHt = Math.abs(this.height(root.left) - this.height(root.right));
    let bothBal = this.isBalanced(root.left) && this.isBalanced(root.right);
    return diffHt < 2 && bothBal
  }
  rebalance() {
    let arr = [];
    this.dfs_traverse('inorder', x => arr.push(x)); //get sorted values
    this.buildTree(arr);
  }
}

class Graph {
  #adjacencyList = {}; //OBJECT
  addVertex(vertex) {
    this.#adjacencyList[vertex] ??= new Set(); //'A' : ['B', 'C']
  }
  removeVertex(vertex) {
    for (let adjvtx of this.#adjacencyList[vertex])
      this.removeEdge(vertex, adjvtx);
    return delete this.#adjacencyList[vertex];
  }
  addEdge(v1, v2) {
    this.addVertex(v1); this.addVertex(v2);
    this.#adjacencyList[v1].add(v2);
    this.#adjacencyList[v2].add(v1);  //undirected graph, so 2-way link
  }
  hasEdge(v1, v2) {
    return this.#adjacencyList[v1].has(v2);
  }
  removeEdge(v1, v2) {
    this.#adjacencyList[v1].delete(v2);
    this.#adjacencyList[v2].delete(v1);
  }
  display() {
    for (let vertex in this.#adjacencyList)
      console.log(vertex, `->\t`, ...this.#adjacencyList[vertex]);
  }
}
