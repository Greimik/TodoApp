$("select").select2({ dropdownCssClass: "dropdown-inverse" });

let toDoList = {
  tasksArray: new Array()
};
toDoList.newTaskForm = document.getElementById("newTaskForm");
toDoList.taskName = document.getElementById("taskName");
toDoList.tbody = document.querySelector("tbody");
toDoList.select = document.getElementById("taskSelect");
toDoList.taskType = document.getElementById("taskType");
toDoList.priorytyValue = 0;
toDoList.tasksArray = localStorage.getItem(constants.LOCAL_STORAGE_TASKS_ITEM)
  ? JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_TASKS_ITEM))
  : [];
localStorage.setItem(constants.LOCAL_STORAGE_TASKS_ITEM, JSON.stringify(toDoList.tasksArray));

(toDoList.newTask = function(taskName, taskPriority) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");

  switch (taskPriority) {
    case constants.HIGH_PRIORITY:
      tr.classList.add(constants.HIGH_PRIORITY_CSS_CLASS);
      break;
    case constants.MEDIUM_PRIORITY:
      tr.classList.add(constants.MEDIUM_PRIORITY_CSS_CLASS);
      break;
    case constants.LOW_PRIORITY:
      tr.classList.add(constants.LOW_PRIORITY_CSS_CLASS);
      break;
    default:
      break;
  }

  toDoList.tbody.appendChild(tr);
  td1.textContent = taskName;
  td2.textContent = taskPriority;
  tr.appendChild(td1);
  tr.appendChild(td2);
}),
  (toDoList.newTaskForm = addEventListener("submit", function(e) {
    e.preventDefault();
    switch (toDoList.select.value) {
      case constants.HIGH_PRIORITY:
        toDoList.priorytyValue = 3;
        break;
      case constants.MEDIUM_PRIORITY:
        toDoList.priorytyValue = 2;
        break;
      case constants.LOW_PRIORITY:
        toDoList.priorytyValue = 1;
        break;

      default:
        break;
    }
    if (toDoList.taskType.value === constants.FAKE_TASK) {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => response.json())
        .then(json => {
          toDoList.addItemsToArray(
            json.title,
            toDoList.select.value,
            toDoList.priorytyValue
          );
        });
    } else {
      toDoList.addItemsToArray(
        toDoList.taskName.value,
        toDoList.select.value,
        toDoList.priorytyValue
      );
    }
  })),
  toDoList.tasksArray.forEach(task => {
    toDoList.newTask(task.taskName, task.taskPriority);
  }),
  (toDoList.addItems = function(itemsToAdd) {
    localStorage.removeItem(constants.LOCAL_STORAGE_TASKS_ITEM);
    localStorage.setItem(constants.LOCAL_STORAGE_TASKS_ITEM, JSON.stringify(itemsToAdd));
    location.reload();
  });
toDoList.addItemsToArray = function(taskName, taskPriority, priorytyValue) {
  toDoList.tasksArray.push({
    taskName: taskName,
    taskPriority: taskPriority,
    priorytyValue: priorytyValue
  });
  localStorage.setItem(constants.LOCAL_STORAGE_TASKS_ITEM, JSON.stringify(toDoList.tasksArray));
  toDoList.newTask(taskName, taskPriority);
  toDoList.taskName.value = "";
};

let storing = {
  importButton: document.getElementById("importButton"),
  exportButton: document.getElementById("exportButton"),
  export: exportButton.addEventListener("click", function(e) {
    e.preventDefault();

    let dataUri =
      "data:application/json;charset=UTF-8," +
      encodeURIComponent(localStorage.getItem(constants.LOCAL_STORAGE_TASKS_ITEM));
    let link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", constants.EXPORT_NAME_FILE);
    link.click();
  }),

  import: importButton.addEventListener("change", function(e) {
    e.preventDefault();
    const listFiles = this.files[0];
    let reader = new FileReader();
    reader.onload = function() {
      localStorage.setItem(constants.LOCAL_STORAGE_TASKS_ITEM, reader.result);
    };
    reader.readAsText(listFiles);
    location.reload();
  })
};

let sortingFunctinos = {
  sortAsc: key => {
    let itemToSort = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_TASKS_ITEM));
    let sortedItems = itemToSort.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    toDoList.addItems(sortedItems);
  },

  sortDesc: key => {
    let itemToSort = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_TASKS_ITEM));
    let sortedItems = itemToSort.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    toDoList.addItems(sortedItems);
  }
};
