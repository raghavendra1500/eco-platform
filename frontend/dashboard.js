//Base URL + Token
const BASE_URL = "https://eco-platform.onrender.com/api";

// later after login you store token
const token = localStorage.getItem("token");

//Load Tasks
async function loadTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  const tasks = await res.json();

  const taskContainer = document.querySelector(".tasks");

  taskContainer.innerHTML = "<h2>Today's Challenges</h2>";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.classList.add("task-card");

    div.innerHTML = `
      <h4>${task.title}</h4>
      <p>Points: ${task.points}</p>
      <button onclick="submitTask('${task._id}')">Submit</button>
    `;

    taskContainer.appendChild(div);
  });
}

// Submit Task
async function submitTask(taskId) {
  const image = "sample.jpg"; // later replace with upload

  await fetch(`${BASE_URL}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      taskId,
      image
    })
  });

  alert("Task submitted!");
}
//Load Leaderboard
async function loadLeaderboard() {
  const res = await fetch(`${BASE_URL}/auth/leaderboard`);
  const users = await res.json();

  const container = document.querySelector(".leaderboard");

  container.innerHTML = "<h2>Top Students 🏆</h2>";

  users.slice(0, 5).forEach((user, index) => {
    const div = document.createElement("div");
    div.classList.add("leader");

    div.innerHTML = `
      <span>${index + 1}. ${user.name}</span>
      <span>${user.ecoPoints} pts</span>
    `;

    container.appendChild(div);
  });
}
//Load User Info
function loadUser() {
  // later you fetch from backend
  document.querySelector(".topbar h3").innerText = "Welcome, Student 👋";
}
//Run Everything
loadUser();
loadTasks();
loadLeaderboard();
