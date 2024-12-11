import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

// Função de login
const login = async (email, senha) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios/login`, {
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Falha no login");
  }
};

// Função de logout
const logout = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/usuarios/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Falha ao sair");
  }
};

// Função para obter os dados do usuário atual
const me = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Falha ao obter dados do usuário");
  }
};

// Novo método para validar o token
const validateToken = async () => {
  try {
    await me();
    return true; // Token é válido
  } catch (error) {
    return false; // Token é inválido
  }
};

export default {
  login,
  logout,
  me,
  validateToken, // Exportar o novo método
};
