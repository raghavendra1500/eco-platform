import { useEffect, useState } from "react";
import API from "../services/api";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const res = await API.get("/auth/leaderboard");
    setUsers(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leaderboard 🏆</h1>

      {users.map((u, index) => (
        <div key={index}>
          {index + 1}. {u.name} - {u.ecoPoints}
        </div>
      ))}
    </div>
  );
}
