import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

<Navbar />

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const submitTask = async (taskId) => {
    const token = localStorage.getItem("token");

    await API.post(
      "/submissions",
      { taskId, proof: "image-url" },
      {
        headers: { Authorization: token }
      }
    );

    alert("Submitted!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard 🌱</h1>

      {tasks.map((task) => (
        <div key={task._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.points} points</p>

          <button onClick={() => submitTask(task._id)}>
            Submit
          </button>
        </div>
      ))}
    </div>
  );
}

// image submission and acception
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const submitTask = async (taskId) => {
    const token = localStorage.getItem("token");

    if (!image) {
      alert("Upload image first");
      return;
    }

    const base64 = await convertToBase64(image);

    await API.post(
      "/submissions",
      {
        taskId,
        image: base64
      },
      {
        headers: { Authorization: token }
      }
    );

    alert("Submitted with proof!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard 🌱</h1>

      {tasks.map((task) => (
        <div key={task._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button onClick={() => submitTask(task._id)}>
            Submit with Proof
          </button>
        </div>
      ))}
    </div>
  );
}
