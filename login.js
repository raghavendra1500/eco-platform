const BASE_URL = "http://localhost:5000/api";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();

  if (data.token) {
    // Store token
    localStorage.setItem("token", data.token);

    alert("Login successful!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}
