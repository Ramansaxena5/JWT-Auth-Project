import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axiosInstance";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/users/admin/stats");
        setStats(data.stats);
      } catch (err) {
        setError("Could not load admin statistics.");
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
    { text: "New user account created", time: "2 minutes ago" },
    { text: "System backup completed", time: "1 hour ago" },
    { text: "Security patch applied", time: "3 hours ago" },
    { text: "Database optimisation finished", time: "5 hours ago" },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.brand}>JWT Auth Platform</span>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>Hi, Admin {user?.fullName}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.banner}>
          <h2 style={styles.bannerTitle}>Admin Dashboard</h2>
          <p style={styles.bannerSub}>Welcome back! Here's what's happening across the platform.</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, borderLeft: "4px solid #14b8a6"}}>
            <p style={styles.statTitle}>Total Users</p>
            <p style={styles.statValue}>{loading ? "—" : stats?.totalUsers}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: "4px solid #8b5cf6"}}>
            <p style={styles.statTitle}>Total Managers</p>
            <p style={styles.statValue}>{loading ? "—" : stats?.totalManagers}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: "4px solid #ef4444"}}>
            <p style={styles.statTitle}>Total Admins</p>
            <p style={styles.statValue}>{loading ? "—" : stats?.totalAdmins}</p>
          </div>
          <div style={{...styles.statCard, borderLeft: "4px solid #10b981"}}>
            <p style={styles.statTitle}>System Health</p>
            <p style={styles.statValue}>{loading ? "—" : stats?.systemHealth}</p>
          </div>
        </div>

        <div style={styles.contentGrid}>
          <section style={styles.card}>
            <h3 style={styles.cardTitle}>Admin Actions</h3>
            <div style={styles.actionItem}>Manage Users</div>
            <div style={styles.actionItem}>System Settings</div>
            <div style={styles.actionItem}>View Logs</div>
            <div style={styles.actionItem}>Security Settings</div>
          </section>

          <section style={styles.card}>
            <h3 style={styles.cardTitle}>Recent Admin Activities</h3>
            {recentActivities.map((a, i) => (
              <div key={i} style={styles.activityRow}>
                <div style={styles.activityText}>{a.text}</div>
                <div style={styles.activityTime}>{a.time}</div>
              </div>
            ))}
          </section>
        </div>

        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Admin Information</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>{user?.fullName}</td>
                  <td style={styles.td}>{user?.email}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>Admin</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={styles.warningBox}>
            <strong>⚠️ Warning:</strong> Admin access has full system control. Use settings with caution.
          </div>
        </section>

        <div style={styles.actionButtons}>
          <button onClick={() => navigate("/dashboard")} style={{...styles.navBtn, background: "#3b82f6"}}>
            View User Dashboard
          </button>
          <button onClick={() => navigate("/manager")} style={{...styles.navBtn, background: "#8b5cf6"}}>
            View Manager Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

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
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" },
  statCard: { padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" },
  statTitle: { margin: "0 0 10px", color: "#64748b", fontSize: "14px" },
  statValue: { margin: 0, color: "#0f172a", fontSize: "24px", fontWeight: "bold" },
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
  card: { background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" },
  cardTitle: { margin: "0 0 15px", color: "#0f172a", fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" },
  actionItem: { padding: "10px 0", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155", fontWeight: "500" },
  activityRow: { padding: "10px 0", borderBottom: "1px solid #f1f5f9" },
  activityText: { fontSize: "14px", color: "#334155", fontWeight: "500", marginBottom: "4px" },
  activityTime: { fontSize: "12px", color: "#94a3b8" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" },
  th: { borderBottom: "1px solid #e2e8f0", padding: "10px", color: "#64748b", fontWeight: "600" },
  td: { borderBottom: "1px solid #f1f5f9", padding: "10px", color: "#0f172a" },
  badge: { background: "#fee2e2", color: "#ef4444", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" },
  warningBox: { borderLeft: "4px solid #f59e0b", background: "#fef3c7", color: "#92400e", padding: "12px 16px", borderRadius: "4px", marginTop: "20px", fontSize: "14px" },
  actionButtons: { display: "flex", gap: "15px" },
  navBtn: { padding: "10px 16px", cursor: "pointer", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "500", fontSize: "14px" }
};

export default AdminDashboard;
