// routes that add authentication to the app. (based on user role- student or admin)
// Name: Kevin, Matt, Aaryan, Camryn
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import auth from '../services/authService'; 

function ProtectedRoute({ path, element }) {
  if (auth.getCurrentUser()) return <Route path={path} element={element} />;
  return <Navigate to="/login" />;
}

export default ProtectedRoute;