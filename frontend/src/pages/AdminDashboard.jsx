import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const res = await API.get("/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load submissions");
    }
  };

  const approve = async (id) => {
    await API.put(`/submissions/approve/${id}`);
    alert("Approved ✅");
    loadSubmissions();
  };

  const reject = async (id) => {
    await API.put(`/submissions/reject/${id}`);
    alert("Rejected ❌");
    loadSubmissions();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel 🔴</h1>

      {submissions.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "15px",
            borderRadius: "10px"
          }}
        >
          <p><b>User:</b> {s.user?.name}</p>
          <p><b>Task:</b> {s.task?.title}</p>
          <p><b>Points:</b> {s.task?.points}</p>
          <p><b>Status:</b> {s.status}</p>

          {/* ✅ IMAGE PROOF */}
          {s.proof && (
            <div>
              <p><b>Proof:</b></p>
              <img
                src={s.proof}
                alt="proof"
                style={{ width: "200px", borderRadius: "10px" }}
              />
            </div>
          )}

          <br />

          <button onClick={() => approve(s._id)}>
            Approve ✅
          </button>

          <button
            onClick={() => reject(s._id)}
            style={{ marginLeft: "10px" }}
          >
            Reject ❌
          </button>
        </div>
      ))}
    </div>
  );
}
