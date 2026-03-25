import { useState } from "react";
import API from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    school: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Signup success");
      window.location.href = "/";
    } catch {
      alert("Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup 🌱</h2>

      <input name="name" placeholder="Name" onChange={handleChange} /><br/><br/>
      <input name="school" placeholder="School" onChange={handleChange} /><br/><br/>
      <input name="email" placeholder="Email" onChange={handleChange} /><br/><br/>
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br/><br/>

      <button onClick={signup}>Signup</button>
    </div>
  );
}
