$("select").select2({ dropdownCssClass: "dropdown-inverse" });

const newTaskForm = document.getElementById("newTaskForm");
const taskName = document.getElementById("taskName");
const tbody = document.querySelector("tbody");
const select = document.querySelector("select");
let priorytyValue = 0;
const importButton = document.getElementById("importButton");
const exportButton = document.getElementById("exportButton");
const sortTaskNameAscButton = document.getElementById("sortTaskNameAscButton");
const sortTaskNameDescButton = document.getElementById(
  "sortTaskNameDescButton"
);
const sortTaskPriorityAscButton = document.getElementById(
  "sortTaskPriorityAscButton"
);
const sortTaskPriorityDescButton = document.getElementById(
  "sortTaskPriorityDescButton"
);

let tasksArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
localStorage.setItem("tasks", JSON.stringify(tasksArray));
const data = JSON.parse(localStorage.getItem("tasks"));

const newTask = (taskName, taskPriority) => {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");

  switch (taskPriority) {
    case "Wysoki":
      tr.classList.add("highPriority");
      priorytyValue = 3;
      break;
    case "Średni":
      tr.classList.add("mediumPriority");
      priorytyValue = 2;
      break;
    case "Niski":
      tr.classList.add("lowPriority");
      priorytyValue = 1;
      break;
    default:
      break;
  }

  tbody.appendChild(tr);
  td1.textContent = taskName;
  td2.textContent = taskPriority;
  tr.appendChild(td1);
  tr.appendChild(td2);
};

newTaskForm.addEventListener("submit", function(e) {
  e.preventDefault();

  tasksArray.push({
    taskName: taskName.value,
    taskPriority: select.value,
    priorytyValue: priorytyValue
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  newTask(taskName.value, select.value);
  taskName.value = "";
});

data.forEach(task => {
  newTask(task.taskName, task.taskPriority);
});

window.addEventListener("load", event => {
  //   let tmpTasks = [
  //     { taskName: "C1", taskPriority: "Wysoki", priorytyValue: 3 },
  //     { taskName: "B2", taskPriority: "Średni", priorytyValue: 2 },
  //     { taskName: "A3", taskPriority: "Niski", priorytyValue: 1 },
  //     { taskName: "C3", taskPriority: "Średni", priorytyValue: 2 },
  //     { taskName: "B1", taskPriority: "Średni", priorytyValue: 2 },
  //     { taskName: "A2", taskPriority: "Wysoki", priorytyValue: 3 }
  //   ];
  //   localStorage.setItem("tasks", JSON.stringify(tmpTasks));
});

exportButton.addEventListener("click", function(e) {
  e.preventDefault();

  let dataUri =
    "data:application/json;charset=UTF-8," +
    encodeURIComponent(localStorage.getItem("tasks"));
  let link = document.createElement("a");
  link.setAttribute("href", dataUri);
  link.setAttribute("download", "todo.json");
  link.click();
});

sortTaskNameAscButton.addEventListener("click", function(e) {
  e.preventDefault();

  if (localStorage.getItem("tasks").length > 0) {
    let arrayItems = [];
    let itemToSort = JSON.parse(localStorage.getItem("tasks"));
    itemToSort.map(task => {
      arrayItems.push(task);
    });
    let sortedItems = arrayItems.sort((a, b) =>
      a.taskName > b.taskName ? 1 : -1
    );
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(sortedItems));
    location.reload();
  }
});

sortTaskNameDescButton.addEventListener("click", function(e) {
  e.preventDefault();

  if (localStorage.getItem("tasks").length > 0) {
    let arrayItems = [];
    let itemToSort = JSON.parse(localStorage.getItem("tasks"));
    itemToSort.map(task => {
      arrayItems.push(task);
    });
    let sortedItems = arrayItems.sort((a, b) =>
      a.taskName > b.taskName ? -1 : 1
    );
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(sortedItems));
    location.reload();
  }
});

sortTaskPriorityAscButton.addEventListener("click", function(e) {
  e.preventDefault();

  if (localStorage.getItem("tasks").length > 0) {
    let arrayItems = [];
    let itemToSort = JSON.parse(localStorage.getItem("tasks"));
    itemToSort.map(task => {
      arrayItems.push(task);
    });
    let sortedItems = arrayItems.sort((a, b) =>
      a.priorytyValue > b.priorytyValue ? 1 : -1
    );
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(sortedItems));
    location.reload();
  }
});

sortTaskPriorityDescButton.addEventListener("click", function(e) {
  e.preventDefault();

  if (localStorage.getItem("tasks").length > 0) {
    let arrayItems = [];
    let itemToSort = JSON.parse(localStorage.getItem("tasks"));
    itemToSort.map(task => {
      arrayItems.push(task);
    });
    let sortedItems = arrayItems.sort((a, b) =>
      a.priorytyValue > b.priorytyValue ? -1 : 1
    );
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(sortedItems));
    location.reload();
  }
});

importButton.addEventListener("change", function(e) {
  e.preventDefault();
  const listFiles = this.files;
  let reader = new FileReader();
  reader.onload =e=>{
      console.log(e.target.files)
  }
});
