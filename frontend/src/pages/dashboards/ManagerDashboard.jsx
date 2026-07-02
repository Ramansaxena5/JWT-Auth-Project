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
        <span style={styles.brand}>JWT Auth</span>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>
            Welcome, Manager {user?.fullName}
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.banner}>
          <h1 style={styles.bannerTitle}>Manager Dashboard</h1>
          <p style={styles.bannerSubtitle}>
            Welcome back! Manage your team effectively.
          </p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.statsGrid}>
          <StatCard
            icon="👥"
            label="Team Members"
            value={loading ? "—" : (stats?.teamMembers ?? 0)}
          />
          <StatCard
            icon="📁"
            label="Active Projects"
            value={loading ? "—" : (stats?.activeProjects ?? 0)}
          />
          <StatCard
            icon="⏳"
            label="Pending Approvals"
            value={loading ? "—" : (stats?.pendingTasks ?? 0)}
          />
        </div>

        <div style={styles.contentGrid}>
          <section style={styles.panel}>
            <h3 style={styles.panelTitle}>🕓 Recent Activities</h3>

            {recentActivities.map((a, i) => (
              <p key={i} style={styles.activityText}>
                • {a}
              </p>
            ))}
          </section>

          <section style={styles.panel}>
            <h3 style={styles.panelTitle}>👤 Manager Information</h3>
            <InfoRow label="Name" value={user?.fullName} />
            <InfoRow label="Email" value={user?.email} />
            <InfoRow label="Role" value="Manager" />
          </section>
        </div>

        <div style={styles.noticeBox}>
          ℹ️ Manager-level access lets you oversee team members, approve
          requests, and review projects.
        </div>

        <div style={styles.actionButtons}>
          <button
            onClick={() => navigate("/dashboard")}
            style={styles.secondaryBtn}
          >
            View User Dashboard
          </button>
          <button onClick={() => navigate("/admin")} style={styles.primaryBtn}>
            Go to Admin Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div style={styles.statCard}>
    <div style={styles.statIcon}>{icon}</div>
    <div>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statLabel}>{label}</p>
    </div>
  </div>
);

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

    background: "linear-gradient(90deg, #1e3a8a, #2563eb)",

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

  main: { maxWidth: "1100px", margin: "0 auto", padding: "24px 16px" },

  banner: {
    background: "linear-gradient(135deg, #4338ca, #7c3aed)",

    borderRadius: "12px",
    padding: "24px",
    color: "#fff",
    marginBottom: "20px",
  },

  bannerTitle: { fontSize: "24px", fontWeight: "700", margin: "0 0 4px" },

  bannerSubtitle: { fontSize: "14px", opacity: 0.9, margin: 0 },

  errorBox: {
    background: "#fef2f2",
    color: "#dc2626",
    padding: "10px 14px",

    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "13px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",

    gap: "14px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#fff",
    borderRadius: "10px",
    padding: "16px",

    display: "flex",
    alignItems: "center",
    gap: "12px",

    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  statIcon: { fontSize: "26px" },

  statValue: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
    color: "#1f2937",
  },

  statLabel: { fontSize: "12px", color: "#6b7280", margin: 0 },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px",
  },

  panel: {
    background: "#fff",
    borderRadius: "10px",
    padding: "18px",

    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  panelTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0 0 12px",
  },

  activityText: { fontSize: "13px", color: "#374151", margin: "6px 0" },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",

    borderBottom: "1px solid #f1f1f1",
    fontSize: "13px",
  },

  infoLabel: { color: "#6b7280" },

  infoValue: { color: "#1f2937", fontWeight: "600" },

  noticeBox: {
    background: "#eff6ff",
    color: "#1e40af",
    padding: "12px 16px",

    borderRadius: "8px",
    fontSize: "12.5px",
    marginBottom: "20px",
  },

  actionButtons: { display: "flex", gap: "12px" },

  primaryBtn: {
    flex: 1,
    padding: "11px",
    background: "#dc2626",
    color: "#fff",

    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
  },

  secondaryBtn: {
    flex: 1,
    padding: "11px",
    background: "#2563eb",
    color: "#fff",

    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default ManagerDashboard;
