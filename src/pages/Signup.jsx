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

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/register", form);
      alert(res.data.message);
      window.location.href = "/";
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Create Account 🌱</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <input name="school" placeholder="School" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-2 border rounded"/>

        <button onClick={handleSignup} className="w-full bg-green-500 text-white p-2 rounded">
          Signup
        </button>
      </div>
    </div>
  );
}
