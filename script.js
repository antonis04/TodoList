function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    taskInput.focus();
    
    if (taskText === "") return;

    const taskList = document.getElementById("taskList");
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const checkButton = document.createElement("button");
    checkButton.innerHTML = "&#10003;";
    checkButton.classList.add("check-btn");
    checkButton.onclick = function () {
        taskDiv.classList.toggle("done");
    };

    const taskSpan = document.createElement("span");
    taskSpan.classList.add("text");
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        taskList.removeChild(taskDiv);
    };

    taskDiv.appendChild(checkButton);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(deleteButton);
    taskList.appendChild(taskDiv);

   
    taskInput.value = "";
    taskInput.focus();
}
