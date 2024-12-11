// src/components/dashboard/MaiorVendaCard.jsx

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import dashboardService from "../../services/dashboardService";

const MaiorVendaCard = () => {
  const [maiorVenda, setMaiorVenda] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMaiorVenda = async () => {
      try {
        const response = await dashboardService.getMaiorVenda();
        setMaiorVenda(response[0]); // Assume que o primeiro item é o maior
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar maior venda:", error);
        setIsLoading(false);
      }
    };

    fetchMaiorVenda();
  }, []);

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  if (!maiorVenda) {
    return <Typography>Não há dados disponíveis</Typography>;
  }

  return (
    <Card sx={{ mb: 4, backgroundColor: "#00c0ef", color: "#fff" }}>
      <CardContent>
        <Typography variant="h8" gutterBottom>
          Maior Venda por Pedido
        </Typography>
        <Typography variant="h6">
          {maiorVenda.valorTotalCompras.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
        <Typography>Cliente: {maiorVenda.clienteNome}</Typography>
      </CardContent>
    </Card>
  );
};

export default MaiorVendaCard;
