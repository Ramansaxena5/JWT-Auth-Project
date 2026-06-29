import axios from "axios";

// ── Base instance ─────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",

  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor ───────────────────────────────────────────────────────

// Automatically attaches the stored JWT to every outgoing request.

// No need to add Authorization headers manually anywhere in the app.

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────────────

// If the server returns 401 (expired / invalid token), clear local state

// and redirect to login so the user isn't stuck on a broken screen.

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
