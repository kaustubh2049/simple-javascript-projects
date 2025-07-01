document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to create a task item
  function createTaskElement(taskObj) {
    const li = document.createElement("li");
    li.setAttribute("data-id", taskObj.id);
    li.innerHTML = `
        ${taskObj.name}
        <span class="deleter-btn">✖</span>
      `;
    li.style.backgroundColor = "lightyellow";
    taskList.appendChild(li);

    li.querySelector(".deleter-btn").addEventListener("click", () => {
      li.remove();
      const idToRemove = parseInt(li.getAttribute("data-id"));
      tasks = tasks.filter((t) => t.id !== idToRemove);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  }

  // Load saved tasks
  tasks.forEach(createTaskElement);

  // Add task on button click
  addBtn.addEventListener("click", () => {
    const taskName = input.value.trim();
    if (taskName === "") return;

    const taskObj = { id: Date.now(), name: taskName };
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(taskObj);
    input.value = "";
  });
});
