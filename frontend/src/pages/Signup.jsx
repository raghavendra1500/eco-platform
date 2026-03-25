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
    console.log("Signup clicked", form); // 👈 DEBUG

    try {
      const res = await API.post("/auth/register", form);
      console.log(res.data);

      alert("Signup success");
      window.location.href = "/";
    } catch (err) {
      console.error(err); // 👈 IMPORTANT
      alert("Signup failed");
    }
  };

  return (
    <div>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="school" onChange={handleChange} placeholder="School" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />

      <button onClick={signup}>Signup</button>
    </div>
  );
}
