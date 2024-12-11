import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const getSubcategorias = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/subcategorias`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao obter subcategorias"
    );
  }
};

const createSubcategoria = async (subcategoria) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/subcategorias`,
      subcategoria,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao criar subcategoria"
    );
  }
};

const updateSubcategoria = async (id, subcategoria) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/subcategorias/${id}`,
      subcategoria,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao atualizar subcategoria"
    );
  }
};

const deleteSubcategoria = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/subcategorias/${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao deletar subcategoria"
    );
  }
};

export default {
  getSubcategorias,
  createSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
};
