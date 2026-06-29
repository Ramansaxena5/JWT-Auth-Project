import React from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/**

* ProtectedRoute

*

* Wraps any route element that requires authentication or a specific role.

* Saves the attempted URL so we can redirect back after login.

*

* Usage:

*   <Route path="/admin" element={

*     <ProtectedRoute allowedRoles={['admin']}>

*       <AdminDashboard />

*     </ProtectedRoute>

*   } />

*/

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return (
      <div style={styles.loader}>
        <div style={styles.spinner} />
        <p style={styles.loaderText}>Checking credentials…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Remember where the user was trying to go

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorised" replace />;
  }

  return children;
};

const styles = {
  loader: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    height: "100vh",

    gap: "16px",

    background: "#f8f9fa",
  },

  spinner: {
    width: "40px",

    height: "40px",

    border: "4px solid #e0e0e0",

    borderTop: "4px solid #6366f1",

    borderRadius: "50%",

    animation: "spin 0.9s linear infinite",
  },

  loaderText: {
    color: "#6b7280",

    fontSize: "14px",
  },
};

export default ProtectedRoute;
