// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Employer/DashboardPage';
import ManagersPage from './pages/Employer/ManagersPage';
import LeadsPage from './pages/Employer/LeadsPage';
import ManagerLeadsPage from './pages/Manager/ManagerLeadsPage';

// Protected route components
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        isAuthenticated ? 
        <Navigate to={user.role === 'employer' ? '/employer/dashboard' : '/manager/leads'} /> : 
        <LoginPage />
      } />

      {/* Redirect from root to appropriate page based on role */}
      <Route path="/" element={
        <Navigate to={
          !isAuthenticated ? 
          '/login' : 
          (user?.role === 'employer' ? '/employer/dashboard' : '/manager/leads')
        } />
      } />

      {/* Employer Routes */}
      <Route path="/employer/dashboard" element={
        <ProtectedRoute allowedRoles={['employer']}>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/employer/managers" element={
        <ProtectedRoute allowedRoles={['employer']}>
          <ManagersPage />
        </ProtectedRoute>
      } />
      
      <Route path="/employer/leads" element={
        <ProtectedRoute allowedRoles={['employer']}>
          <LeadsPage />
        </ProtectedRoute>
      } />

      {/* Manager Routes */}
      <Route path="/manager/leads" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <ManagerLeadsPage />
        </ProtectedRoute>
      } />

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;