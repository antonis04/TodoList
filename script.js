{
const tasks = [];

const addNewTask = (newTaskContent) => {
    tasks.push({
        content: newTaskContent,
        done: false,
    });

    render();
};

const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
};

const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
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
};

const render = () => {
  let htmlString = "";

  for (const task of tasks) {
      htmlString += `
          <li class="task-item${task.done ? " task-item--completed" : ""}">
              <button class="js-done task-item__done">✔</button>
              <span class="task-item__content">${task.content}</span>
              <button class="js-remove task-item__remove">🗑</button>
          </li>
      `;
  }

  document.querySelector(".js-tasks").innerHTML = htmlString;

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