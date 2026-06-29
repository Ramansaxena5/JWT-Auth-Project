import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Basic Placeholder Dashboards
const AdminDashboard = () => <div style={{ padding: '20px' }}><h1>Admin Dashboard</h1></div>;
const ManagerDashboard = () => <div style={{ padding: '20px' }}><h1>Manager Dashboard</h1></div>;
const UserDashboard = () => <div style={{ padding: '20px' }}><h1>User Dashboard</h1></div>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manager" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirect root to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
