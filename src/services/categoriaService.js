import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

// Adiciona o token de autenticação no cabeçalho da requisição
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const getCategorias = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/categorias`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao obter categorias"
    );
  }
};

const createCategoria = async (categoria) => {
  try {
    // Verifique o payload para garantir que inclui os campos necessários
    if (!categoria.nome) {
      throw new Error("Nome da categoria é obrigatório.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/categorias`,
      categoria,
      authHeader()
    );
    return response.data;
  } catch (error) {
    // Log para debug: Imprimir o erro completo
    console.error("Erro ao criar categoria:", error);

    // Tentar capturar e relatar mensagens de erro mais especificas
    throw new Error(
      error.response?.data?.message || "Falha ao criar categoria"
    );
  }
};

const updateCategoria = async (id, categoria) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/categorias/${id}`,
      categoria,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao atualizar categoria"
    );
  }
};

const deleteCategoria = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/categorias/${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao deletar categoria"
    );
  }
};

export default {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
