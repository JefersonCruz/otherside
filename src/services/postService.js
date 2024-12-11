import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

// Adiciona o token de autenticação no cabeçalho da requisição
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// Função para lidar com erros de requisição
const handleRequestError = (error, defaultMessage) => {
  return new Error(error.response?.data?.message || defaultMessage);
};

// Função para obter todos os posts
const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, authHeader());
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "Falha ao obter posts");
  }
};

export default {
  getPosts,
};
