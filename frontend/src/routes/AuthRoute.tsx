// src/routes/AuthRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: JSX.Element;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // Or get from store

  if (token) {
    // User is logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is not logged in, show auth page
  return children;
};

export default AuthRoute;
