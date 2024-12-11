// src/components/dashboard/MediaVendaCard.jsx

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import dashboardService from "../../services/dashboardService";

const MediaVendaCard = () => {
  const [mediaVenda, setMediaVenda] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMediaVenda = async () => {
      try {
        const response = await dashboardService.getMediaVenda();
        setMediaVenda(response[0].mediaValorTotal); // Assume que a média está no primeiro objeto
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar média de venda:", error);
        setIsLoading(false);
      }
    };

    fetchMediaVenda();
  }, []);

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  if (mediaVenda === null) {
    return <Typography>Não há dados disponíveis</Typography>;
  }

  return (
    <Card sx={{ mb: 4, backgroundColor: "#00a65a", color: "#fff" }}>
      <CardContent>
        <Typography variant="h8" gutterBottom>
          Média por Pedido
        </Typography>
        <Typography variant="h6">
          {mediaVenda.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
        <Typography>Ano</Typography>
      </CardContent>
    </Card>
  );
};

export default MediaVendaCard;
