import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "./Header";
import Footer from "./Footer";
import SidebarNav from "./SidebarNav";
import Categoria from "../cadastros/Categoria";
import SubCategoria from "../cadastros/SubCategoria";
import Produto from "../cadastros/Produto";
import PostsList from "../posts/PostsList";
import Dashboard from "../dashboard/Dashboard";
import Sobre from "../sobre/Sobre";

const AdminPanel = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <SidebarNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            {/* Redireciona a rota base para o Dashboard */}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="cadastros/categoria" element={<Categoria />} />
            <Route path="cadastros/subcategoria" element={<SubCategoria />} />
            <Route path="cadastros/produto" element={<Produto />} />
            <Route path="sobre" element={<Sobre />} />
            {/* Adicione mais rotas conforme necessário */}
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminPanel;
