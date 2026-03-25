const BASE_URL = "https://eco-platform.onrender.com/api";

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
    localStorage.setItem("userId", data.user._id);

    alert("Login successful!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}
