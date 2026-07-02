import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const user = await register({ fullName: formData.fullName, email: formData.email, password: formData.password, role: formData.role });
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "manager") navigate("/manager");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
          <input name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required style={styles.input} />
          
          <label style={styles.label}>Email Address</label>
          <input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required style={styles.input} />
          
          <label style={styles.label}>Password</label>
          <input name="password" type="password" placeholder="Minimum 6 characters" value={formData.password} onChange={handleChange} required style={styles.input} />
          
          <label style={styles.label}>Confirm Password</label>
          <input name="confirmPassword" type="password" placeholder="Repeat your password" value={formData.confirmPassword} onChange={handleChange} required style={styles.input} />
          
          <label style={styles.label}>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Log in here</Link>
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
    padding: "30px 30px",
    width: "100%",
    maxWidth: "400px",
  },
  title: { textAlign: "center", fontSize: "24px", color: "#333", margin: "0 0 8px" },
  subtitle: { textAlign: "center", fontSize: "14px", color: "#666", margin: "0 0 20px" },
  error: { background: "#fee2e2", color: "#b91c1c", padding: "10px", borderRadius: "4px", marginBottom: "16px", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column" },
  label: { fontSize: "13px", color: "#444", marginBottom: "4px", marginTop: "12px" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" },
  select: { padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", background: "#fff" },
  button: { marginTop: "24px", padding: "12px", background: "#10b981", color: "#fff", border: "none", borderRadius: "4px", fontSize: "15px", cursor: "pointer", fontWeight: "500" },
  footer: { textAlign: "center", fontSize: "14px", marginTop: "20px", color: "#666" },
  link: { color: "#4f46e5", textDecoration: "none", fontWeight: "600" },
};

export default Register;
