import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;