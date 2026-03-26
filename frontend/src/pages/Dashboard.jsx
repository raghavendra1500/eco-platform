import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [images, setImages] = useState({}); // ✅ separate image per task

  useEffect(() => {
    loadData();
  }, []);

  // LOAD BOTH TASKS + SUBMISSIONS
  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [taskRes, subRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/submissions/my", {
          headers: { Authorization: token }
        })
      ]);

      setTasks(taskRes.data);
      setSubmissions(subRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  // HANDLE IMAGE PER TASK
  const handleImageChange = (taskId, file) => {
    setImages((prev) => ({
      ...prev,
      [taskId]: file
    }));
  };

  // CONVERT IMAGE
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // SUBMIT
  const submitTask = async (taskId) => {
    try {
      const file = images[taskId];
      if (!file) return alert("Upload image first");

      const base64 = await convertToBase64(file);
      const token = localStorage.getItem("token");

      await API.post(
        "/submissions",
        { taskId, image: base64 },
        { headers: { Authorization: token } }
      );

      alert("Submitted!");
      loadData();

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting");
    }
  };

  // EDIT
  const editTask = async (submissionId, taskId) => {
    try {
      const file = images[taskId];
      if (!file) return alert("Upload new image");

      const base64 = await convertToBase64(file);
      const token = localStorage.getItem("token");

      await API.put(
        `/submissions/edit/${submissionId}`,
        { image: base64 },
        { headers: { Authorization: token } }
      );

      alert("Updated!");
      loadData();

    } catch (err) {
      console.error(err);
      alert("Error updating");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>🌱 Eco Tasks</h1>

        {tasks.map((task) => {
          // FIND SUBMISSION FOR TASK
          const submission = submissions.find(
            (s) => s.task._id === task._id
          );

          return (
            <div key={task._id} className="card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(task._id, e.target.files[0])
                }
              />

              {/* UI LOGIC */}
              {!submission && (
                <button onClick={() => submitTask(task._id)}>
                  Submit
                </button>
              )}

              {submission && (
                <>
                  <p className={`status ${submission.status}`}>
                    {submission.status}
                  </p>

                  {/* ❌ DISABLE EDIT IF APPROVED */}
                  {submission.status !== "approved" && (
                    <button
                      onClick={() =>
                        editTask(submission._id, task._id)
                      }
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
