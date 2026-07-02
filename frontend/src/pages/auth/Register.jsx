import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",

    email: "",

    password: "",

    confirmPassword: "",

    role: "user",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);

    try {
      const user = await register({
        fullName: formData.fullName,

        email: formData.email,

        password: formData.password,

        role: formData.role,
      });

      // Redirect based on role

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "manager") navigate("/manager");
      else navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join the platform today</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg, #56ab6e 0%, #4facb8 50%, #4a6cf7 100%)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    padding: "20px",
  },

  card: {
    background: "#ffffff",

    borderRadius: "12px",

    padding: "36px 32px",

    width: "100%",

    maxWidth: "400px",

    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",

    fontSize: "24px",

    fontWeight: "700",

    color: "#1a1a2e",

    margin: "0 0 4px",
  },

  subtitle: {
    textAlign: "center",

    fontSize: "14px",

    color: "#6b7280",

    margin: "0 0 24px",
  },

  error: {
    background: "#fef2f2",

    color: "#dc2626",

    border: "1px solid #fecaca",

    borderRadius: "8px",

    padding: "10px 14px",

    fontSize: "13px",

    marginBottom: "16px",
  },

  form: { display: "flex", flexDirection: "column", gap: "4px" },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginTop: "10px",
  },

  input: {
    padding: "10px 12px",

    border: "1px solid #d1d5db",

    borderRadius: "8px",

    fontSize: "14px",

    outline: "none",

    marginTop: "4px",
  },

  select: {
    padding: "10px 12px",

    border: "1px solid #d1d5db",

    borderRadius: "8px",

    fontSize: "14px",

    background: "#fff",

    marginTop: "4px",
  },

  button: {
    marginTop: "20px",

    padding: "12px",

    background: "#22c55e",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontSize: "15px",

    fontWeight: "600",

    cursor: "pointer",

    letterSpacing: "0.3px",
  },

  footer: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "16px",
  },

  link: { color: "#4a6cf7", fontWeight: "600", textDecoration: "none" },
};

export default Register;
