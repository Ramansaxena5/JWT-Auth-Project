import React, { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // If the user was redirected here, send them back after login

  const redirectTo = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const user = await login(email, password);

      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else if (user.role === "admin") navigate("/admin");
      else if (user.role === "manager") navigate("/manager");
      else navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",

    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    padding: "20px",
  },

  card: {
    background: "#ffffff",

    borderRadius: "12px",

    padding: "40px 32px",

    width: "100%",

    maxWidth: "380px",

    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",

    fontSize: "26px",

    fontWeight: "700",

    color: "#1a1a2e",

    margin: "0 0 4px",
  },

  subtitle: {
    textAlign: "center",

    fontSize: "14px",

    color: "#6b7280",

    margin: "0 0 28px",
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
    marginTop: "12px",
  },

  input: {
    padding: "11px 13px",

    border: "1px solid #d1d5db",

    borderRadius: "8px",

    fontSize: "14px",

    outline: "none",

    marginTop: "4px",
  },

  button: {
    marginTop: "24px",

    padding: "13px",

    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontSize: "15px",

    fontWeight: "600",

    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "20px",
  },

  link: { color: "#667eea", fontWeight: "600", textDecoration: "none" },
};

export default Login;
