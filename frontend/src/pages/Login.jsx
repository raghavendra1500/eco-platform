import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
  try {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    if (res.data.user.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }

  } catch {
    alert("Login failed");
  }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login 🌱</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>

      <button onClick={login}>Login</button>

      <p onClick={() => window.location.href="/signup"}>Signup</p>
    </div>
  );
}
