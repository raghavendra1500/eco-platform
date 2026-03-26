import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchSubmissions();
  }, []);

  // GET TASKS
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  // GET USER SUBMISSIONS
  const fetchSubmissions = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get("/submissions/my", {
      headers: { Authorization: token }
    });

    setSubmissions(res.data);
  };

  // CONVERT IMAGE
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  // SUBMIT
  const submitTask = async (taskId) => {
    const token = localStorage.getItem("token");

    if (!image) return alert("Upload image first");

    const base64 = await convertToBase64(image);

    await API.post(
      "/submissions",
      { taskId, image: base64 },
      { headers: { Authorization: token } }
    );

    alert("Submitted!");
    fetchSubmissions();
  };

  // EDIT
  const editTask = async (submissionId) => {
    const token = localStorage.getItem("token");

    if (!image) return alert("Upload new image");

    const base64 = await convertToBase64(image);

    await API.put(
      `/submissions/edit/${submissionId}`,
      { image: base64 },
      { headers: { Authorization: token } }
    );

    alert("Updated!");
    fetchSubmissions();
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard 🌱</h1>

        {tasks.map((task) => {
          const submission = submissions.find(
            (s) => s.task._id === task._id
          );

          return (
            <div
              key={task._id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                borderRadius: "10px"
              }}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              {/* IMAGE INPUT */}
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {/* UI LOGIC */}
              {submission ? (
              <>
                <p>
                  Status:{" "}
                  {submission.status === "pending" && "⏳ Pending"}
                  {submission.status === "approved" && "✅ Approved"}
                  {submission.status === "rejected" && "❌ Rejected"}
                </p>
              
                {/* ❌ Disable edit if approved */}
                {submission.status !== "approved" && (
                <button onClick={() => editTask(submission._id)}>
                    Edit Submission
                </button>
                )}
              </>
            ) : (
              <button onClick={() => submitTask(task._id)}>
                Submit Task
              </button>
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
