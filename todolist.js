// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = 'X';
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(newTodo) {
    if (newTodo instanceof Todo) {
      this.todos.push(newTodo);
    } else {
      throw new TypeError("can only add Todo objects");
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.todos.length - 1];
  }

  _isInvalidIndex(index) {
    return index === undefined || index < 0 || Number.isNaN(Number(index)) || index >= this.size();
  }

  _validIndexCheck(index) {
    if (this._isInvalidIndex(index)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  itemAt(index) {
    this._validIndexCheck(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validIndexCheck(index);
    return this.todos.splice(index, 1)[0];
  }

  toString() {
    console.log(`---- ${this.title} ----`);
    this.todos.forEach(todo => console.log(todo.toString()));
  }

  forEach(callback) {
    this.todos.forEach(callback, this);
  }

  filter(callback) {
    let newTodoList = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        newTodoList.add(todo);
      }
    });
    return newTodoList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo) todo.markDone();
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }
}
