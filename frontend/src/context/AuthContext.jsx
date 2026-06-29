import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import api from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // ── Restore session on mount ────────────────────────────────────────────────

  useEffect(() => {
    const stored = localStorage.getItem("user");

    const token = localStorage.getItem("token");

    if (stored && token) {
      setUser(JSON.parse(stored));
    }

    setIsLoading(false);
  }, []);

  // ── register ────────────────────────────────────────────────────────────────

  const register = useCallback(async (formData) => {
    const { data } = await api.post("/auth/register", formData);

    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data.user;
  }, []);

  // ── login ───────────────────────────────────────────────────────────────────

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data.user;
  }, []);

  // ── logout ──────────────────────────────────────────────────────────────────

  // Remove everything from storage and clear auth state.

  const logout = useCallback(() => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];

    setUser(null);
  }, []);

  const value = {
    user,

    isLoading,

    isAuthenticated: !!user,

    register,

    login,

    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook — avoids importing useContext + AuthContext in every file

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");

  return ctx;
};
