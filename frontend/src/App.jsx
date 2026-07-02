import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/auth/Register";

import Login from "./pages/auth/Login";

import AdminDashboard from "./pages/dashboards/AdminDashboard";

import ManagerDashboard from "./pages/dashboards/ManagerDashboard";

import UserDashboard from "./pages/dashboards/UserDashboard";

const Unauthorised = () => (
  <div
    style={{ textAlign: "center", marginTop: "80px", fontFamily: "system-ui" }}
  >
    <h2>403 — Not Authorised</h2>
    <p>You don't have permission to view this page.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorised" element={<Unauthorised />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user", "manager", "admin"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={["manager", "admin"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
