import "../css/style.css";
import { format } from "date-fns";
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || [];

let projectDialog = document.getElementById("project-dialog");
let editProDialog = document.getElementById("edit-project-dialog");
let editProBox = document.getElementById("new-name");
let projectIdBox = document.getElementById("pro-id");
let taskDialog = document.getElementById("task-dialog");
let editTaskDialog = document.getElementById("edit-task-dialog");
let sidebarBtns = document.querySelectorAll(
  ".sidebar .box:not(.add-task):not(.add-project)"
);
let selectProject = document.getElementById("select-project");
let taskIdBox = document.getElementById("task-id");
let taskTitleBox = document.getElementById("task-title");
let newTaskTitle = document.getElementById("new-task-title");
let taskDescriptionBox = document.getElementById("description");
let newtaskDescrBox = document.getElementById("new-descr");
let taskDateBox = document.getElementById("task-date");
let newTaskDate = document.getElementById("new-task-date");
let taskPriorityBox = document.getElementById("task-priority");
let newTaskPriority = document.getElementById("new-task-prio");
let projectNameBox = document.getElementById("project-name");
let mainContent = document.querySelector(".main-content");
let toggleProjectBtn = document.getElementById("show-project");
let projectsList = document.querySelector(".projects-list");
let tasksList = document.querySelector(".tasks-list");

let today = format(new Date(), "yyyy-MM-dd");

taskDateBox.setAttribute("min", today);
newTaskDate.setAttribute("min", today);

// Create Constructor To Create New Project

const Project = function (title, id) {
  this.title = title;
  this.id = id;
};

// Create Constructor To Create New Task

const Task = function (project, title, describe, date, priority, id) {
  this.project = project;
  this.title = title;
  this.describe = describe;
  this.date = date;
  this.priority = priority;
  this.id = id;
};

// Function To Close Dialog Box

const closeDialog = (dialog) => {
  if (dialog.id === "project-dialog") {
    projectNameBox.value = "";
  } else if (dialog.id === "task-dialog") {
    resetAddTaskDialog();
  }
  dialog.classList.remove("show");
  setTimeout(() => {
    dialog.close();
  }, 500);
};

// Add data To Local Storage

const addToLocalStorage = (array, dataName) => {
  localStorage.setItem(dataName, JSON.stringify(array));
};

// Add Project To Project

const addProjectsToList = (array) => {
  projectsList.innerHTML = "";
  selectProject.innerHTML = "";
  if (array.length) {
    array.forEach((project) => {
      let projectItem = document.createElement("div");
      projectItem.className = "box project-item";
      projectItem.id = project.id;
      projectItem.dataset.nav = project.title;
      projectItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>${project.title}</title>
                  <path
                    d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z"
                  />
                </svg>`;
      let projectName = document.createElement("p");
      projectName.className = "name";
      projectName.textContent = project.title;
      projectItem.appendChild(projectName);
      let button = document.createElement("button");
      button.className = "show-details";
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Show Details</title>
                    <path
                      d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
                    />
                  </svg>`;
      projectItem.appendChild(button);
      let detailsBox = document.createElement("div");
      detailsBox.className = "details";
      projectItem.appendChild(detailsBox);
      let editBtn = document.createElement("button");
      editBtn.className = "edit";
      editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Edit Project</title>
                      <path
                        d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                      />
                    </svg>
                    Edit`;
      detailsBox.appendChild(editBtn);
      let deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-project";
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Delete Project</title>
                      <path
                        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                      />
                    </svg>
                    Delete`;
      detailsBox.appendChild(deleteBtn);
      projectsList.appendChild(projectItem);
      let option = document.createElement("option");
      option.value = project.title;
      option.textContent = project.title;
      selectProject.appendChild(option);
    });
  }

  // Active The Choosen Button On Sidebar

  document
    .querySelectorAll(".sidebar .box:not(.add-task):not(.add-project)")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        addRemoveActive(btn);
        createContent();
      });
    });

  // Show Details Menu To Edit Or Delete Project

  document.querySelectorAll(".show-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!btn.nextElementSibling.classList.contains("show")) {
        hideDetailsBox();
        btn.nextElementSibling.classList.add("show");
      } else {
        btn.nextElementSibling.classList.remove("show");
        btn.blur();
      }
    });
  });

  // Hide Details Menu

  document.addEventListener("click", (e) => {
    let detailsBoxes = document.querySelectorAll(".details.show");
    if (detailsBoxes.length) {
      if (
        !e.target.classList.contains("details") &&
        !e.target.parentElement.classList.contains("details") &&
        !e.target.parentElement.parentElement.parentElement.classList.contains(
          "details"
        )
      ) {
        hideDetailsBox();
      }
    }
  });

  // Show Edit Project Dialog

  document.querySelectorAll(".details .edit").forEach((btn, ind) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      editProDialog.showModal();
      editProDialog.classList.add("show");
      hideDetailsBox();
      editProBox.value = projects[ind].title;
      projectIdBox.value = projects[ind].id;
    });

    // Edit Project Name And Update Tasks That Belong To It

    document.getElementById("edit-project").addEventListener("click", (e) => {
      if (editProBox.value) {
        e.preventDefault();
        projects.forEach((pro, index) => {
          if (pro.id === projectIdBox.value) {
            if (tasks.length) {
              tasks.forEach((task) => {
                if (task.project === projects[index].title) {
                  task.project = editProBox.value;
                }
              });
              addToLocalStorage(tasks, "tasks");
              createContent();
            }
            projects[index].title = editProBox.value;
            closeDialog(editProDialog);
            addToLocalStorage(projects, "projects");
            addProjectsToList(projects);
            sidebarBtns = document.querySelectorAll(
              ".sidebar .box:not(.add-task):not(.add-project)"
            );
            addRemoveActive(sidebarBtns[index + 4]);
            createContent();
          }
        });
      }
    });
  });

  // Delete Project And Tasks That Belong To It

  document
    .querySelectorAll(".details .delete-project")
    .forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (tasks.length) {
          tasks = tasks.filter(
            (task) => task.project !== projects[index].title
          );
          addToLocalStorage(tasks, "tasks");
          createContent();
        }

        projects.splice(index, 1);
        addToLocalStorage(projects, "projects");
        addProjectsToList(projects);
        let element = btn.parentElement.parentElement;
        if (element.classList.contains("active")) {
          sidebarBtns = document.querySelectorAll(
            ".sidebar .box:not(.add-task):not(.add-project)"
          );
          addRemoveActive(sidebarBtns[index + 3]);
          createContent();
        }
      });
    });
};

// Reset Add Task Dialog

const resetAddTaskDialog = () => {
  taskTitleBox.value = "";
  taskDescriptionBox.value = "";
  taskDateBox.value = "";
  taskPriorityBox.value = taskPriorityBox.children[0].value;
};

// Add Active class To Sidebar Button

const addRemoveActive = (ele) => {
  sidebarBtns.forEach((btn) => btn.classList.remove("active"));
  ele.classList.add("active");
};

// Hide Details Box

const hideDetailsBox = () => {
  document.querySelectorAll(".details").forEach((detail) => {
    detail.classList.remove("show");
  });
};

// Create Content For Main Section
// This function will create the content for the main section based on the active sidebar button

const createContent = () => {
  sidebarBtns = document.querySelectorAll(
    ".sidebar .box:not(.add-task):not(.add-project)"
  );
  sidebarBtns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      mainContent.querySelector("h2").textContent =
        btn.querySelector(".name").textContent;
      mainContent.querySelector(".add-task").style.display = "flex";
      let deleteBox = document.querySelector(".delete-box");
      if (deleteBox) {
        deleteBox.remove();
      }
      tasksList.innerHTML = "";
      if (tasks.length) {
        tasks.forEach((task) => {
          if (btn.dataset.nav === "today" && task.date === today) {
            createTaskItem(
              task.id,
              task.title,
              task.describe,
              task.date,
              task.priority
            );
          } else if (btn.dataset.nav === "upcomming" && task.date !== today) {
            createTaskItem(
              task.id,
              task.title,
              task.describe,
              task.date,
              task.priority
            );
          } else if (btn.dataset.nav === task.project) {
            createTaskItem(
              task.id,
              task.title,
              task.describe,
              task.date,
              task.priority
            );
          } else if (btn.dataset.nav === "my-projects") {
            createTaskItem(
              task.id,
              task.title,
              task.describe,
              task.date,
              task.priority
            );
          }
        });

        document.querySelectorAll(".edit-task").forEach((btn) => {
          btn.addEventListener("click", () => {
            editTaskDialog.showModal();
            editTaskDialog.classList.add("show");
            let btnId = btn.parentElement.parentElement.id;
            tasks.forEach((task) => {
              if (task.id === btnId) {
                taskIdBox.value = btnId;
                newTaskTitle.value = task.title;
                newtaskDescrBox.value = task.describe;
                newTaskDate.value = task.date;
                newTaskPriority.value = task.priority;
              }
            });
          });
        });
        document.getElementById("edit-task").addEventListener("click", (e) => {
          if (
            newTaskTitle.value &&
            newtaskDescrBox.value &&
            newTaskDate.value &&
            newTaskPriority.value
          ) {
            e.preventDefault();
            tasks.forEach((task) => {
              if (taskIdBox.value === task.id) {
                task.title = newTaskTitle.value;
                task.describe = newtaskDescrBox.value;
                task.date = newTaskDate.value;
                task.priority = newTaskPriority.value;
              }
            });
            createContent();
            addToLocalStorage(tasks, "tasks");
            closeDialog(editTaskDialog);
          }
        });
        document.querySelectorAll(".task-done").forEach((btn) => {
          btn.addEventListener("click", () => {
            let taskId = btn.parentElement.id;
            tasks.forEach((task, ind) => {
              if (task.id === taskId) {
                completed.push(task);
                tasks.splice(ind, 1);
              }
            });
            addToLocalStorage(tasks, "tasks");
            addToLocalStorage(completed, "completed");
            createContent();
          });
        });
      }

      if (completed.length && btn.dataset.nav === "completed") {
        mainContent.querySelector(".add-task").style.display = "none";
        tasksList.innerHTML = "";
        completed.forEach((task) => {
          createTaskItem(
            task.id,
            task.title,
            task.describe,
            task.date,
            task.priority
          );
        });
        document
          .querySelectorAll(".task-done")
          .forEach((task) => task.classList.add("done"));
        document
          .querySelectorAll(".edit-task")
          .forEach((task) => task.classList.add("hide"));

        let deleteForm = document.createElement("form");
        deleteForm.className = "delete-box";
        mainContent.appendChild(deleteForm);
        let deleteInput = document.createElement("input");
        deleteInput.id = "delete-input";
        deleteInput.type = "number";
        deleteInput.min = 1;
        deleteInput.max = completed.length;
        deleteInput.required = true;
        deleteInput.placeholder = "Enter Number Of Task To Delete";
        deleteForm.appendChild(deleteInput);
        let deleteOne = document.createElement("button");
        deleteOne.className = "delete-one";
        deleteOne.textContent = "Delete One";
        deleteForm.appendChild(deleteOne);
        let deleteAll = document.createElement("button");
        deleteAll.className = "delete-all";
        deleteAll.textContent = "Delete All";
        deleteForm.appendChild(deleteAll);

        document.querySelector(".delete-one").addEventListener("click", (e) => {
          let numberOfTask = document.getElementById("delete-input");
          if (numberOfTask.value) {
            e.preventDefault();
            completed.splice(numberOfTask.value - 1, 1);
            addToLocalStorage(completed, "completed");
            createContent();
          }
        });
        document.querySelector(".delete-all").addEventListener("click", (e) => {
          e.preventDefault();
          completed.splice(0);
          addToLocalStorage(completed, "completed");
          createContent();
        });
      } else if (completed.length === 0 && btn.dataset.nav === "completed") {
        mainContent.querySelector(".add-task").style.display = "none";
        let emptyComplete = document.createElement("p");
        emptyComplete.className = "empty-msg";
        emptyComplete.textContent = "There Is No Completed Task";
        tasksList.appendChild(emptyComplete);
      }
    }
  });
};

// Create Task Item

const createTaskItem = (id, title, describe, date, priority) => {
  let taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.id = id;
  tasksList.appendChild(taskItem);
  let taskDone = document.createElement("span");
  taskDone.className = "task-done";
  taskItem.appendChild(taskDone);
  let header = document.createElement("h3");
  header.textContent = title;
  let editTask = document.createElement("button");
  editTask.className = "edit-task";
  editTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Edit Task</title>
                      <path
                        d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                      />
                    </svg>`;
  header.appendChild(editTask);
  taskItem.appendChild(header);
  let description = document.createElement("p");
  description.textContent = describe;
  taskItem.appendChild(description);
  let taskInfo = document.createElement("div");
  taskInfo.className = "task-info";
  taskItem.appendChild(taskInfo);
  let taskDate = document.createElement("div");
  taskDate.className = "date";
  taskDate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>calendar-month-outline</title><path d="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z" /></svg>${date}`;
  taskInfo.appendChild(taskDate);
  let taskPriority = document.createElement("div");
  taskPriority.className = "priority";
  taskPriority.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exclamation</title><path d="M 11,4L 13,4L 13,15L 11,15L 11,4 Z M 13,18L 13,20L 11,20L 11,18L 13,18 Z" /></svg> ${priority}`;
  taskInfo.appendChild(taskPriority);
};

// Show Or Hide Sidebar

document.querySelector(".switch-sidebar").addEventListener("click", () => {
  document.querySelector(".sidebar-container").classList.toggle("show");
});

// Show Add Project Dialog

document.querySelectorAll(".add-project").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    projectDialog.showModal();
    projectDialog.classList.add("show");
  });
});

// Show Add Task Dialog

document.querySelectorAll(".add-task").forEach((btn) => {
  btn.addEventListener("click", () => {
    let projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((btn, index) => {
      if (btn.classList.contains("active")) {
        selectProject.value = selectProject.children[index].value;
      }
    });
    taskDialog.showModal();
    taskDialog.classList.add("show");
  });
});

// Close Dialog Boxes

document.querySelectorAll("dialog .cancel").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let dialog = e.target.parentElement.parentElement.parentElement;
    e.preventDefault();
    closeDialog(dialog);
  });
});

// Create New Project And Add It To The list

document.getElementById("create-project").addEventListener("click", (e) => {
  if (projectNameBox.value) {
    e.preventDefault();
    projects.push(new Project(projectNameBox.value, crypto.randomUUID()));
    closeDialog(projectDialog);
    addToLocalStorage(projects, "projects");
    addProjectsToList(projects);
    sidebarBtns = document.querySelectorAll(
      ".sidebar .box:not(.add-task):not(.add-project)"
    );
    addRemoveActive(sidebarBtns[sidebarBtns.length - 1]);
    createContent();
  }
});

// Show Or Hide Projects List

toggleProjectBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  projectsList.classList.toggle("hide");
  if (projectsList.classList.contains("hide")) {
    toggleProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Show Projects</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>`;
    projectsList.style.overflow = "hidden";
    setTimeout(() => {
      projectsList.style.height = "0";
    }, 0);
  } else {
    toggleProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Hide Projects</title>
                    <path
                      d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                    />
                  </svg>`;
    projectsList.style.overflow = "visible";
    setTimeout(() => {
      projectsList.style.height = "auto";
    }, 500);
  }
});

// Create New Task

document.getElementById("add-task").addEventListener("click", (e) => {
  if (
    selectProject.value &&
    taskTitleBox.value &&
    taskDescriptionBox.value &&
    taskDateBox.value &&
    taskPriorityBox.value
  ) {
    e.preventDefault();
    tasks.push(
      new Task(
        selectProject.value,
        taskTitleBox.value,
        taskDescriptionBox.value,
        taskDateBox.value,
        taskPriorityBox.value,
        crypto.randomUUID()
      )
    );
    resetAddTaskDialog();
    addToLocalStorage(tasks, "tasks");
    closeDialog(taskDialog);
    createContent();
  }
});

addProjectsToList(projects);
createContent();
