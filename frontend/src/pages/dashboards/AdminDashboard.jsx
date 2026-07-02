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
    { text: "New user account created", time: "2 minutes ago", icon: "👤" },

    { text: "System backup completed", time: "1 hour ago", icon: "💾" },

    { text: "Security patch applied", time: "3 hours ago", icon: "🛡️" },

    { text: "Database optimisation finished", time: "5 hours ago", icon: "⚙️" },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.brand}>JWT Auth</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>
            Welcome, Admin {user?.fullName}
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.banner}>
          <h1 style={styles.bannerTitle}>Admin Dashboard</h1>
          <p style={styles.bannerSubtitle}>
            Welcome back! Here's what's happening across the platform.
          </p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.statsGrid}>
          <StatCard
            icon="👥"
            label="Total Users"
            value={loading ? "—" : (stats?.totalUsers ?? 0)}
          />
          <StatCard
            icon="🧑‍💼"
            label="Total Managers"
            value={loading ? "—" : (stats?.totalManagers ?? 0)}
          />
          <StatCard
            icon="⚡"
            label="Total Admins"
            value={loading ? "—" : (stats?.totalAdmins ?? 0)}
          />
          <StatCard
            icon="✅"
            label="System Health"
            value={loading ? "—" : (stats?.systemHealth ?? "Good")}
          />
        </div>

        <div style={styles.contentGrid}>
          <section style={styles.panel}>
            <h3 style={styles.panelTitle}>📋 Admin Actions</h3>
            <ActionItem
              title="Manage Users"
              subtitle="Add, edit, or remove user accounts"
            />
            <ActionItem
              title="System Settings"
              subtitle="Configure platform-wide settings"
            />
            <ActionItem
              title="View Logs"
              subtitle="Audit system and security logs"
            />
            <ActionItem
              title="Security Settings"
              subtitle="Manage authentication policies"
            />
          </section>

          <section style={styles.panel}>
            <h3 style={styles.panelTitle}>🕓 Recent Admin Activities</h3>

            {recentActivities.map((a, i) => (
              <div key={i} style={styles.activityRow}>
                <span style={styles.activityIcon}>{a.icon}</span>
                <div>
                  <p style={styles.activityText}>{a.text}</p>
                  <p style={styles.activityTime}>{a.time}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <section style={styles.infoPanel}>
          <h3 style={styles.panelTitle}>Admin Information</h3>
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
                  <span style={styles.roleBadge}>Admin</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={styles.warningBox}>
            ⚠️ Admin access has full system control. Use settings with caution.
          </div>
        </section>

        <div style={styles.actionButtons}>
          <button
            onClick={() => navigate("/dashboard")}
            style={styles.secondaryBtn}
          >
            View User Dashboard
          </button>
          <button
            onClick={() => navigate("/manager")}
            style={styles.primaryBtn}
          >
            View Manager Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

// ── Small reusable sub-components ────────────────────────────────────────────

const StatCard = ({ icon, label, value }) => (
  <div style={styles.statCard}>
    <div style={styles.statIcon}>{icon}</div>
    <div>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statLabel}>{label}</p>
    </div>
  </div>
);

const ActionItem = ({ title, subtitle }) => (
  <div style={styles.actionItem}>
    <p style={styles.actionTitle}>{title}</p>
    <p style={styles.actionSubtitle}>{subtitle}</p>
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

    background: "linear-gradient(90deg, #3730a3, #4338ca)",

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
    background: "linear-gradient(135deg, #dc2626, #ef4444)",

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

  actionItem: { padding: "10px 0", borderBottom: "1px solid #f1f1f1" },

  actionTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    margin: 0,
  },

  actionSubtitle: { fontSize: "12px", color: "#9ca3af", margin: "2px 0 0" },

  activityRow: {
    display: "flex",
    gap: "10px",
    padding: "8px 0",
    alignItems: "flex-start",
  },

  activityIcon: { fontSize: "16px" },

  activityText: {
    fontSize: "12.5px",
    color: "#374151",
    margin: 0,
    fontWeight: "500",
  },

  activityTime: { fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" },

  infoPanel: {
    background: "#fff",
    borderRadius: "10px",
    padding: "18px",

    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },

  th: {
    textAlign: "left",
    padding: "8px",
    color: "#6b7280",
    borderBottom: "1px solid #e5e7eb",
  },

  td: { padding: "8px", color: "#1f2937", borderBottom: "1px solid #f1f1f1" },

  roleBadge: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "2px 10px",

    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
  },

  warningBox: {
    marginTop: "12px",
    background: "#fffbeb",
    color: "#92400e",

    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "12px",
  },

  actionButtons: { display: "flex", gap: "12px" },

  primaryBtn: {
    flex: 1,
    padding: "11px",
    background: "#7c3aed",
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
    background: "#22c55e",
    color: "#fff",

    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default AdminDashboard;
