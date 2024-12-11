import axios from "axios";

// URL base para a API
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

// Função para configurar o cabeçalho de autenticação
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// Função assíncrona para obter lista de produtos
const getProdutos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/produtos`, authHeader());
    return response.data; // Retorna os dados dos produtos
  } catch (error) {
    throw new Error(error.response?.data?.message || "Falha ao obter produtos");
  }
};

// Função para criar um novo produto com imagem
const createProduto = async (produto, imagem) => {
  try {
    const formData = new FormData(); // Usado para enviar dados de formulário
    formData.append("nome", produto.nome);
    formData.append("preco", produto.preco);
    formData.append("categoriaId", produto.categoriaId);
    formData.append("subcategoriaId", produto.subcategoriaId);
    if (imagem) {
      formData.append("imagem", imagem); // Adiciona a imagem ao FormData
    }

    const response = await axios.post(`${API_BASE_URL}/produtos`, formData, {
      headers: {
        ...authHeader().headers,
        "Content-Type": "multipart/form-data", // Necessário para uploads de arquivo
      },
    });
    return response.data; // Retorna a resposta da criação do produto
  } catch (error) {
    throw new Error(error.response?.data?.message || "Falha ao criar produto");
  }
};

// Atualiza um produto existente
const updateProduto = async (id, produto, imagem) => {
  try {
    const formData = new FormData();
    formData.append("nome", produto.nome);
    formData.append("preco", produto.preco);
    formData.append("categoriaId", produto.categoriaId);
    formData.append("subcategoriaId", produto.subcategoriaId);
    if (imagem) {
      formData.append("imagem", imagem); // Adiciona a imagem ao FormData se existir
    }

    const response = await axios.put(
      `${API_BASE_URL}/produtos/${id}`,
      formData,
      {
        headers: {
          ...authHeader().headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Retorna os dados atualizados do produto
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao atualizar produto"
    );
  }
};

// Deleta um produto pelo ID
const deleteProduto = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/produtos/${id}`,
      authHeader()
    );
    return response.data; // Retorna a resposta da deleção
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Falha ao deletar produto"
    );
  }
};

export default {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
};
