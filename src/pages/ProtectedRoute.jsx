import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  

  if (!token) {
    // Jika belum login
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // Jika role tidak sesuai, redirect ke dashboard sesuai role
    if (userRole === "admin") return <Navigate to="/admin/dashboard" replace />;
    else return <Navigate to="/dashboard" replace />;
  }

  return children;
}
