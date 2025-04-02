import React from 'react';
import { Navigate } from 'react-router-dom';

// No Route wrapper needed in v6, use as a component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;