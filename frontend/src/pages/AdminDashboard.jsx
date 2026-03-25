import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const res = await API.get("/submissions");
    setSubmissions(res.data);
  };

  const approve = async (id) => {
    await API.put(`/submissions/approve/${id}`);
    alert("Approved");
    loadSubmissions();
  };

  const reject = async (id) => {
    await API.put(`/submissions/reject/${id}`);
    alert("Rejected");
    loadSubmissions();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel 🔴</h1>

      {submissions.map((s) => (
        <div key={s._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <p>User: {s.user?.name}</p>
          <p>Task: {s.task?.title}</p>
          <p>Points: {s.task?.points}</p>
          <p>Status: {s.status}</p>

          <button onClick={() => approve(s._id)}>Approve</button>
          <button onClick={() => reject(s._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
