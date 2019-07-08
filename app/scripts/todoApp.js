$("select").select2({ dropdownCssClass: "dropdown-inverse" });
let toDoList = {
  tasksArray : new Array()
}
toDoList.newTaskForm = document.getElementById("newTaskForm");
toDoList.taskName = document.getElementById("taskName");
toDoList.tbody = document.querySelector("tbody");
toDoList.select = document.querySelector("select");
toDoList.priorytyValue = 0;
toDoList.tasksArray = localStorage.getItem("tasks")
? JSON.parse(localStorage.getItem("tasks"))
: []
localStorage.setItem("tasks", JSON.stringify(toDoList.tasksArray));


toDoList.newTask=function (taskName, taskPriority) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    switch (taskPriority) {
      case "Wysoki":
        tr.classList.add("highPriority");
        break;
      case "Średni":
        tr.classList.add("mediumPriority");
        break;
      case "Niski":
        tr.classList.add("lowPriority");
        break;
      default:
        break;
    }

    toDoList.tbody.appendChild(tr);
    td1.textContent = taskName;
    td2.textContent = taskPriority;
    tr.appendChild(td1);
    tr.appendChild(td2);
  },
  toDoList.newTaskForm=addEventListener("submit", function(e) {
    e.preventDefault();

    switch (toDoList.select.value) {
      case "Wysoki":
        priorytyValue = 3;
        break;
      case "Średni":
        priorytyValue = 2;
        break;
      case "Niski":
        priorytyValue = 1;
        break;

      default:
        break;
    }

    toDoList.tasksArray.push({
      taskName: taskName.value,
      taskPriority: toDoList.select.value,
      priorytyValue: priorytyValue
    });
    localStorage.setItem("tasks", JSON.stringify(toDoList.tasksArray));
    toDoList.newTask(taskName.value, toDoList.select.value);
    taskName.value = "";
  }),
  toDoList.tasksArray.forEach(task => {
    toDoList.newTask(task.taskName, task.taskPriority);
  })


let storing = {
  importButton: document.getElementById("importButton"),
  exportButton: document.getElementById("exportButton"),
  export: exportButton.addEventListener("click", function(e) {
    e.preventDefault();

    let dataUri =
      "data:application/json;charset=UTF-8," +
      encodeURIComponent(localStorage.getItem("tasks"));
    let link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "todo.json");
    link.click();
  }),

  import: importButton.addEventListener("change", function(e) {
    e.preventDefault();
    const listFiles = this.files[0];
    let reader = new FileReader();
    reader.onload = function() {
      localStorage.setItem("tasks", reader.result);
    };
    reader.readAsText(listFiles);
    location.reload();
  })
};

let sortingFunctinos = {
  sortAsc: key => {
    let itemToSort = JSON.parse(localStorage.getItem("tasks"));
    let sortedItems = itemToSort.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(sortedItems));
    location.reload();
  },

  sortDesc: key => {
    let itemToSort = JSON.parse(localStorage.getItem("tasks"));
    let sortedItems = itemToSort.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(sortedItems));
    location.reload();
  }
};
