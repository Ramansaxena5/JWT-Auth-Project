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
        <span style={styles.brand}>JWT Auth</span>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>Welcome, {user?.fullName}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.banner}>
          <h1 style={styles.bannerTitle}>User Dashboard</h1>
          <p style={styles.bannerSubtitle}>
            Here's an overview of your account.
          </p>
        </div>

        <section style={styles.panel}>
          <h3 style={styles.panelTitle}>Profile Completion</h3>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill} />
          </div>
          <p style={styles.progressLabel}>80% complete</p>
        </section>

        <section style={styles.panel}>
          <h3 style={styles.panelTitle}>Account Information</h3>
          <InfoRow label="Name" value={user?.fullName} />
          <InfoRow label="Email" value={user?.email} />
          <InfoRow label="Role" value="User" />
        </section>
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
    background: "#f4f5f9",
    fontFamily: "system-ui, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    background: "linear-gradient(90deg, #047857, #10b981)",

    padding: "14px 24px",
    color: "#fff",
  },

  brand: { fontWeight: "700", fontSize: "15px" },

  headerRight: { display: "flex", alignItems: "center", gap: "14px" },

  welcomeText: { fontSize: "13px", opacity: 0.9 },

  logoutBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",

    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },

  main: { maxWidth: "700px", margin: "0 auto", padding: "24px 16px" },

  banner: {
    background: "linear-gradient(135deg, #059669, #10b981)",

    borderRadius: "12px",
    padding: "24px",
    color: "#fff",
    marginBottom: "20px",
  },

  bannerTitle: { fontSize: "24px", fontWeight: "700", margin: "0 0 4px" },

  bannerSubtitle: { fontSize: "14px", opacity: 0.9, margin: 0 },

  panel: {
    background: "#fff",
    borderRadius: "10px",
    padding: "18px",

    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    marginBottom: "16px",
  },

  panelTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0 0 12px",
  },

  progressTrack: {
    background: "#e5e7eb",
    borderRadius: "20px",
    height: "10px",
    overflow: "hidden",
  },

  progressFill: {
    background: "linear-gradient(90deg, #10b981, #22c55e)",
    height: "100%",
    width: "80%",
  },

  progressLabel: { fontSize: "12px", color: "#6b7280", marginTop: "6px" },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",

    borderBottom: "1px solid #f1f1f1",
    fontSize: "13px",
  },

  infoLabel: { color: "#6b7280" },

  infoValue: { color: "#1f2937", fontWeight: "600" },
};

export default UserDashboard;
