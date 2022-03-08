var command = process.argv[2];
var argument = process.argv[3];
var todoListData = [];

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

var help = () => {
  console.log("Usage : todos [add|delete|list] ['task']");
};

var getTodoData = () => {
  var todoLists = [];
  localStorage._keys.forEach((key) => {
    todoLists.push(key);
  });
  return todoLists;
};

var add = (task) => {
  todoListData = getTodoData();
  localStorage.setItem(task);

  //push the data
  todoListData.push(task);
  listTodo();
};

var listTodo = () => {
  todoListData = getTodoData();
  if (todoListData.length > 0) {
    todoListData.forEach((items) => {
      console.log(items);
    });
  } else {
    console.log("No tasks added");
  }
};

var deleteTodo = (items) => {
  localStorage.removeItem(items);
  console.log("Usage : todos delete [task]") //to delete task
  listTodo();
};

switch (command) {
  case "help":
    help();
    break;

  case "add":
    add(argument);
    break;

  case "delete":
    deleteTodo(argument);
    break;

  case "list":
  case undefined:
    listTodo();
    break;

  default:
    help();
    break;
}