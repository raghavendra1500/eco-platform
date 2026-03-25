const BASE_URL = "https://eco-platform.onrender.com/api";

async function signup() {
  console.log("Signup clicked");

  try {
    const name = document.getElementById("name").value;
    const school = document.getElementById("school").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        school,
        email,
        password
      })
    });

    const data = await res.json();

    console.log(data);
    alert(data.message);

    if (res.status === 201) {
      window.location.href = "login.html";
    }

  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong!");
  }
}
