import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import auth from '../services/authService'; // Import your auth service

function ProtectedRoute({ path, element }) {
  if (auth.getCurrentUser()) return <Route path={path} element={element} />;
  return <Navigate to="/login" />;
}

export default ProtectedRoute;