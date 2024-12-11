// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Se não há token, redireciona para a página de login
    return <Navigate to="/" replace />;
  }

  return children; // Renderiza a rota protegida se o usuário estiver autenticado
};

export default ProtectedRoute;
