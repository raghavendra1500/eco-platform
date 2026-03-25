import { useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    points: ""
  });

  const createTask = async () => {
    await API.post("/tasks", task);
    alert("Task Created");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel 🔴</h1>

      <input placeholder="Title" onChange={(e) => setTask({...task, title: e.target.value})} /><br/>
      <input placeholder="Description" onChange={(e) => setTask({...task, description: e.target.value})} /><br/>
      <input placeholder="Points" onChange={(e) => setTask({...task, points: e.target.value})} /><br/>

      <button onClick={createTask}>Create Task</button>
    </div>
  );
}
