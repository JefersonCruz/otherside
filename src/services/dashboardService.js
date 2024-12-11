// src/services/dashboardService.js

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

// Função para obter vendas mensais
const getVendasMensais = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/venda-total`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "Falha ao obter vendas mensais");
  }
};

// Função para obter vendas por categoria
const getVendasPorCategoria = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/vendas-categorias`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "Falha ao obter vendas por categoria");
  }
};

// Função para obter vendas por clientes
const getVendasPorClientes = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/vendas-clientes`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "Falha ao obter vendas por clientes");
  }
};

// Função para obter a maior venda por pedido
const getMaiorVenda = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/maior-venda`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "Falha ao obter a maior venda por pedido");
  }
};

// Função para obter média de vendas
const getMediaVenda = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/media-venda`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "Falha ao obter média de venda");
  }
};

// Função para obter vendas pendentes
const getVendasPendentes = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/vendas-pendentes`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "Falha ao obter vendas pendentes");
  }
};

export default {
  getVendasMensais,
  getVendasPorCategoria,
  getVendasPorClientes,
  getMaiorVenda,
  getMediaVenda,
  getVendasPendentes,
};
