// All variables
var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

//  Load data from localStorage on page load
window.onload = function () {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todoList = JSON.parse(savedTodos);
    update();
    addinmain(todoList);
  }
};

//  Add event listeners
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

//  Document click listener
document.addEventListener("click", (e) => {
  if (
    e.target.className.split(" ")[0] == "complete" ||
    e.target.className.split(" ")[0] == "ci"
  ) {
    completeTodo(e);
  }
  if (
    e.target.className.split(" ")[0] == "delete" ||
    e.target.className.split(" ")[0] == "di"
  ) {
    deleteTodo(e);
  }
  if (e.target.id == "all") viewAll();
  if (e.target.id == "rem") viewRemaining();
  if (e.target.id == "com") viewCompleted();
});

//  Add by pressing Enter
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") add();
});

//  Update all lists and counters
function update() {
  comdoList = todoList.filter((ele) => ele.complete);
  remList = todoList.filter((ele) => !ele.complete);
  document.getElementById("r-count").innerText = todoList.length.toString();
  document.getElementById("c-count").innerText = comdoList.length.toString();
  saveToLocal(); //  Every time list updates, save it
}

//  Save todoList to localStorage
function saveToLocal() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

//  Add new todo
function add() {
  var value = todoInput.value.trim();
  if (value === "") {
    alert("😮 Task cannot be empty");
    return;
  }

  todoList.push({
    task: value,
    id: Date.now().toString(),
    complete: false,
  });

  todoInput.value = "";
  update();
  addinmain(todoList);
}

//  Render todos
function addinmain(todoList) {
  allTodos.innerHTML = "";
  todoList.forEach((element) => {
    var x = `<li id=${element.id} class="todo-item">
      <p id="task">${
        element.complete ? `<strike>${element.task}</strike>` : element.task
      }</p>
      <div class="todo-actions">
        <button class="complete btn btn-success">
          <i class="ci bx bx-check bx-sm"></i>
        </button>
        <button class="delete btn btn-error">
          <i class="di bx bx-trash bx-sm"></i>
        </button>
      </div>
    </li>`;
    allTodos.innerHTML += x;
  });
}

//  Delete single task
function deleteTodo(e) {
  var deleted = e.target.parentElement.parentElement.getAttribute("id");
  todoList = todoList.filter((ele) => ele.id != deleted);
  update();
  addinmain(todoList);
}

//  Complete or uncomplete task
function completeTodo(e) {
  var completed = e.target.parentElement.parentElement.getAttribute("id");
  todoList.forEach((obj) => {
    if (obj.id == completed) {
      obj.complete = !obj.complete;
    }
  });
  update();
  addinmain(todoList);
}

// Delete all tasks
function deleteAll() {
  if (confirm("⚠️ Are you sure to delete all tasks?")) {
    todoList = [];
    update();
    addinmain(todoList);
  }
}

// Delete only completed tasks
function deleteS() {
  todoList = todoList.filter((ele) => !ele.complete);
  update();
  addinmain(todoList);
}

// Filter views
function viewCompleted() {
  addinmain(comdoList);
}
function viewRemaining() {
  addinmain(remList);
}
function viewAll() {
  addinmain(todoList);
}
