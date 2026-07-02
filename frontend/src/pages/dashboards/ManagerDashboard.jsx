import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axiosInstance";

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/users/manager/stats");
        setStats(data.stats);
      } catch (err) {
        setError("Could not load manager statistics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const recentActivities = [
    "Approved project proposal for Team A",
    "Reviewed performance reports",
    "Scheduled team meeting for next week",
    "Assigned new tasks to team members",
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.brand}>JWT Auth Platform</span>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>Hi, Manager {user?.fullName}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.banner}>
          <h2 style={styles.bannerTitle}>Manager Dashboard</h2>
          <p style={styles.bannerSub}>Welcome back! Manage your team effectively.</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, borderLeft: "4px solid #8b5cf6"}}>
            <p style={styles.statTitle}>Team Members</p>
            <p style={styles.statValue}>{loading ? "—" : stats?.teamMembers}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: "4px solid #0ea5e9"}}>
            <p style={styles.statTitle}>Active Projects</p>
            <p style={styles.statValue}>{loading ? "—" : stats?.activeProjects}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: "4px solid #f59e0b"}}>
            <p style={styles.statTitle}>Pending Approvals</p>
            <p style={styles.statValue}>{loading ? "—" : stats?.pendingTasks}</p>
          </div>
        </div>

        <div style={styles.contentGrid}>
          <section style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Activities</h3>
            <ul style={styles.list}>
              {recentActivities.map((a, i) => <li key={i} style={styles.listItem}>{a}</li>)}
            </ul>
          </section>

          <section style={styles.card}>
            <h3 style={styles.cardTitle}>Manager Information</h3>
            <InfoRow label="Full Name" value={user?.fullName} />
            <InfoRow label="Email Address" value={user?.email} />
            <InfoRow label="Role" value="Manager" />
          </section>
        </div>

        <div style={styles.noticeBox}>
          <strong>Info:</strong> Manager-level access lets you oversee team members and review projects.
        </div>

        <div style={styles.actionButtons}>
          <button onClick={() => navigate("/dashboard")} style={{...styles.navBtn, background: "#3b82f6"}}>
            View User Dashboard
          </button>
          <button onClick={() => navigate("/admin")} style={{...styles.navBtn, background: "#ef4444"}}>
            Go to Admin Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div style={styles.infoRow}>
    <span style={styles.infoLabel}>{label}</span>
    <span style={styles.infoValue}>{value}</span>
  </div>
);

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", padding: "16px 24px", background: "#1e293b", color: "#fff" },
  brand: { fontSize: "18px", fontWeight: "600", letterSpacing: "0.5px" },
  headerRight: { display: "flex", alignItems: "center", gap: "15px" },
  welcomeText: { fontSize: "14px" },
  logoutBtn: { padding: "6px 12px", cursor: "pointer", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "500" },
  main: { padding: "30px 20px", maxWidth: "900px", margin: "0 auto" },
  banner: { background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", marginBottom: "20px" },
  bannerTitle: { margin: "0 0 5px", color: "#0f172a", fontSize: "22px" },
  bannerSub: { margin: 0, color: "#64748b", fontSize: "14px" },
  errorBox: { borderLeft: "4px solid #ef4444", background: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "4px", marginBottom: "20px" },
  statsGrid: { display: "flex", gap: "20px", marginBottom: "20px" },
  statCard: { flex: 1, padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" },
  statTitle: { margin: "0 0 10px", color: "#64748b", fontSize: "14px" },
  statValue: { margin: 0, color: "#0f172a", fontSize: "24px", fontWeight: "bold" },
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
  card: { background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" },
  cardTitle: { margin: "0 0 15px", color: "#0f172a", fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" },
  list: { paddingLeft: "20px", margin: 0 },
  listItem: { padding: "5px 0", color: "#334155", fontSize: "14px" },
  infoRow: { padding: "10px 0", borderBottom: "1px solid #f1f5f9", display: "flex" },
  infoLabel: { color: "#64748b", width: "120px", fontSize: "14px" },
  infoValue: { color: "#0f172a", fontSize: "14px", fontWeight: "500" },
  noticeBox: { borderLeft: "4px solid #3b82f6", background: "#dbeafe", color: "#1e3a8a", padding: "12px 16px", borderRadius: "4px", marginBottom: "20px", fontSize: "14px" },
  actionButtons: { display: "flex", gap: "15px" },
  navBtn: { padding: "10px 16px", cursor: "pointer", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "500", fontSize: "14px" }
};

export default ManagerDashboard;
