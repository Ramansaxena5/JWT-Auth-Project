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

  const roleBadgeStyle = {
    ...styles.roleBadge,

    background:
      user?.role === "admin"
        ? "#3b82f6"
        : user?.role === "manager"
          ? "#8b5cf6"
          : "#22c55e",
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.brand}>JWT Auth</span>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>
            Welcome, {user?.fullName}&nbsp;
            <span style={styles.roleTag}>({user?.role})</span>
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.welcomeCard}>
          <h2 style={styles.welcomeTitle}>User Dashboard</h2>
          <p style={styles.welcomeSub}>Welcome, {user?.fullName}</p>
        </section>

        <div style={styles.statsRow}>
          <div
            style={{
              ...styles.statCard,
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            }}
          >
            <div style={styles.statLeft}>
              <p style={styles.statLabel}>My Tasks</p>
              <p style={styles.statValue}>5</p>
            </div>
            <div style={styles.statIcon}>📋</div>
          </div>

          <div
            style={{
              ...styles.statCard,
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
            }}
          >
            <div style={styles.statLeft}>
              <p style={styles.statLabel}>Notifications</p>
              <p style={styles.statValue}>3</p>
            </div>
            <div style={styles.statIcon}>🔔</div>
          </div>
        </div>

        <section style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Your Information</h3>
          <InfoRow label="Name:" value={user?.fullName} />
          <InfoRow label="Email:" value={user?.email} />
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Role:</span>
            <span style={roleBadgeStyle}>
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "User"}
            </span>
          </div>
        </section>

        <div style={styles.noticeBox}>
          <span style={styles.noticeIcon}>ℹ️</span>
          <span>
            <strong>User Access Level:</strong> You have basic access to view
            your profile and tasks.
          </span>
        </div>

        <div style={styles.btnRow}>
          {(user?.role === "manager" || user?.role === "admin") && (
            <button
              onClick={() => navigate("/manager")}
              style={{ ...styles.navBtn, background: "#7c3aed" }}
            >
              Go to Manager Dashboard
            </button>
          )}

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              style={{ ...styles.navBtn, background: "#dc2626" }}
            >
              Go to Admin Dashboard
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
  page: {
    minHeight: "100vh",

    background: "#f0f2f5",

    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  header: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    background: "#3730a3",

    padding: "12px 28px",

    color: "#fff",
  },

  brand: { fontWeight: "700", fontSize: "16px", letterSpacing: "0.3px" },

  headerRight: { display: "flex", alignItems: "center", gap: "16px" },

  welcomeText: { fontSize: "13px" },

  roleTag: { opacity: 0.8, fontSize: "12px" },

  logoutBtn: {
    background: "#ef4444",

    color: "#fff",

    border: "none",

    padding: "6px 16px",

    borderRadius: "6px",

    fontSize: "13px",

    fontWeight: "600",

    cursor: "pointer",
  },

  main: {
    maxWidth: "780px",

    margin: "32px auto",

    padding: "0 16px",
  },

  welcomeCard: {
    background: "#fff",

    borderRadius: "10px",

    padding: "22px 24px",

    marginBottom: "18px",

    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  },

  welcomeTitle: {
    fontSize: "22px",

    fontWeight: "700",

    color: "#1f2937",

    margin: "0 0 4px",
  },

  welcomeSub: {
    fontSize: "13px",

    color: "#6b7280",

    margin: 0,
  },

  statsRow: {
    display: "grid",

    gridTemplateColumns: "1fr 1fr",

    gap: "16px",

    marginBottom: "18px",
  },

  statCard: {
    borderRadius: "10px",

    padding: "20px 22px",

    color: "#fff",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },

  statLeft: { display: "flex", flexDirection: "column", gap: "4px" },

  statLabel: { fontSize: "13px", margin: 0, opacity: 0.9 },

  statValue: { fontSize: "32px", fontWeight: "700", margin: 0 },

  statIcon: { fontSize: "36px", opacity: 0.85 },

  infoCard: {
    background: "#fff",

    borderRadius: "10px",

    padding: "22px 24px",

    marginBottom: "16px",

    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  },

  infoTitle: {
    fontSize: "15px",

    fontWeight: "700",

    color: "#1f2937",

    margin: "0 0 14px",
  },

  infoRow: {
    display: "flex",

    alignItems: "center",

    padding: "11px 0",

    borderBottom: "1px solid #f1f3f5",

    fontSize: "14px",

    gap: "12px",
  },

  infoLabel: { color: "#6b7280", width: "70px", flexShrink: 0 },

  infoValue: { color: "#1f2937", fontWeight: "500" },

  roleBadge: {
    color: "#fff",

    padding: "2px 14px",

    borderRadius: "20px",

    fontSize: "12px",

    fontWeight: "600",
  },

  noticeBox: {
    background: "#fefce8",

    border: "1px solid #fde68a",

    borderRadius: "8px",

    padding: "12px 16px",

    fontSize: "13px",

    color: "#92400e",

    display: "flex",

    gap: "10px",

    alignItems: "flex-start",

    marginBottom: "20px",
  },

  noticeIcon: { fontSize: "16px", flexShrink: 0 },

  btnRow: { display: "flex", gap: "12px" },

  navBtn: {
    padding: "11px 20px",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontWeight: "600",

    fontSize: "13px",

    cursor: "pointer",
  },
};

export default UserDashboard;
