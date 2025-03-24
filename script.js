{
  let tasks = [];
  let hideCompleted = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
        done: false,
      },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const markAllTasksCompleted = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const toggleHideCompleted = () => {
    hideCompleted = !hideCompleted;
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".task-item__remove");

    removeButtons.forEach((removeButtons, index) => {
      removeButtons.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".task-item__done");

    toggleDoneButtons.forEach((toggleDoneButtons, index) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    const toggleCompletedButton = document.querySelector(".js-toggleCompleted");
    toggleCompletedButton.addEventListener("click", toggleHideCompleted);

    const completeAllButton = document.querySelector(".js-completeAll");
    completeAllButton.addEventListener("click", markAllTasksCompleted);
  };

  const render = () => {
    const taskList = document.querySelector(".js-tasks");
    const toggleCompletedButton = document.querySelector(".js-toggleCompleted");
    const completeAllButton = document.querySelector(".js-completeAll");

    let htmlString = "";

    for (const task of tasks) {
      if (hideCompleted && task.done) {
        continue;
      }

      htmlString += `
          <li class="task-item${task.done ? " task-item--completed" : ""}">
              <button class="js-done task-item__done">✔</button>
              <span class="task-item__content">${task.content}</span>
              <button class="js-remove task-item__remove">🗑</button>
          </li>
      `;
    }

    taskList.innerHTML = htmlString;

    toggleCompletedButton.textContent = hideCompleted
      ? "Pokaż ukończone"
      : "Ukryj ukończone";

    completeAllButton.disabled =
      tasks.every((task) => task.done) || tasks.length === 0;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    document.querySelector(".js-newTask").value = "";
    document.querySelector(".js-newTask").focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
