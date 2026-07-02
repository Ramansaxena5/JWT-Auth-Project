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

  const redirectTo = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await login(email, password);
      if (redirectTo) navigate(redirectTo, { replace: true });
      else if (user.role === "admin") navigate("/admin");
      else if (user.role === "manager") navigate("/manager");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
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
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
            style={styles.input}
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
        <p style={styles.footer}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "40px 30px",
    width: "100%",
    maxWidth: "380px",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    margin: "0 0 8px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    margin: "0 0 24px",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  form: { display: "flex", flexDirection: "column" },
  label: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "6px",
    marginTop: "12px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    marginTop: "24px",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "500",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "20px",
    color: "#666",
  },
  link: { color: "#4f46e5", textDecoration: "none", fontWeight: "600" },
};

export default Login;
