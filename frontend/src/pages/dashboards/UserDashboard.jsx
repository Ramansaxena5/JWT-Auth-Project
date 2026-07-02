import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.brand}>JWT Auth Platform</span>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>
            Hi, {user?.fullName} <span style={styles.roleTag}>({user?.role})</span>
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.banner}>
          <h2 style={styles.bannerTitle}>User Dashboard</h2>
          <p style={styles.bannerSub}>Welcome back, {user?.fullName}</p>
        </div>

        <div style={styles.statsRow}>
          <div style={{...styles.statCard, borderLeft: "4px solid #3b82f6"}}>
            <p style={styles.statTitle}>My Tasks</p>
            <p style={styles.statValue}>5</p>
          </div>
          <div style={{...styles.statCard, borderLeft: "4px solid #10b981"}}>
            <p style={styles.statTitle}>Notifications</p>
            <p style={styles.statValue}>3</p>
          </div>
        </div>

        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Account Profile</h3>
          <InfoRow label="Full Name" value={user?.fullName} />
          <InfoRow label="Email Address" value={user?.email} />
          <InfoRow label="Current Role" value={user?.role} />
        </section>

        <div style={styles.noticeBox}>
          <strong>Info:</strong> You are currently viewing the standard User Dashboard.
        </div>

        <div style={styles.btnRow}>
          {(user?.role === "manager" || user?.role === "admin") && (
            <button onClick={() => navigate("/manager")} style={{...styles.navBtn, background: "#6366f1"}}>
              Switch to Manager Dashboard
            </button>
          )}
          {user?.role === "admin" && (
            <button onClick={() => navigate("/admin")} style={{...styles.navBtn, background: "#ef4444"}}>
              Switch to Admin Dashboard
            </button>
          )}
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
  roleTag: { opacity: 0.7, fontSize: "12px" },
  logoutBtn: { padding: "6px 12px", cursor: "pointer", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "500" },
  main: { padding: "30px 20px", maxWidth: "800px", margin: "0 auto" },
  banner: { background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", marginBottom: "20px" },
  bannerTitle: { margin: "0 0 5px", color: "#0f172a", fontSize: "22px" },
  bannerSub: { margin: 0, color: "#64748b", fontSize: "14px" },
  statsRow: { display: "flex", gap: "20px", marginBottom: "20px" },
  statCard: { flex: 1, padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" },
  statTitle: { margin: "0 0 10px", color: "#64748b", fontSize: "14px" },
  statValue: { margin: 0, color: "#0f172a", fontSize: "24px", fontWeight: "bold" },
  card: { background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", marginBottom: "20px" },
  cardTitle: { margin: "0 0 15px", color: "#0f172a", fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" },
  infoRow: { padding: "10px 0", borderBottom: "1px solid #f1f5f9", display: "flex" },
  infoLabel: { color: "#64748b", width: "120px", fontSize: "14px" },
  infoValue: { color: "#0f172a", fontSize: "14px", fontWeight: "500" },
  noticeBox: { borderLeft: "4px solid #eab308", background: "#fef9c3", color: "#854d0e", padding: "12px 16px", borderRadius: "4px", marginBottom: "20px", fontSize: "14px" },
  btnRow: { display: "flex", gap: "15px" },
  navBtn: { padding: "10px 16px", cursor: "pointer", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "500", fontSize: "14px" }
};

export default UserDashboard;
