// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // Or get from store

  if (!token) {
    // User not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User logged in, show protected page
  return children;
};

export default PrivateRoute;
