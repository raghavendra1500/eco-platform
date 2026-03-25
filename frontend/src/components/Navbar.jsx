export default function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <button onClick={() => window.location.href="/dashboard"}>Dashboard</button>
      <button onClick={() => window.location.href="/leaderboard"}>Leaderboard</button>

      {role === "admin" && (
        <button onClick={() => window.location.href="/admin"}>Admin</button>
      )}
    </div>
  );
}
