import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/userService"; // Certifique-se de que este serviço tem a habilidade de verificar a validade do token

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const isValid = await userService.validateToken(token); // Assumindo que o método validateToken verifica a validade do token
          if (!isValid) {
            handleLogout();
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Erro ao validar o token:", error);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    checkToken();
  }, []);

  const login = async (email, senha) => {
    try {
      const { token } = await userService.login(email, senha);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigate("/admin");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/"); // Redireciona para a tela de login
  };

  const logout = async () => {
    try {
      await userService.logout();
      handleLogout();
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
