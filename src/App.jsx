// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import AdminPanel from "./components/admin/AdminPanel";
import ProtectedRoute from "./routes/ProtectedRoute"; // Importe o componente

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          {/* Outras rotas, se aplicável */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
