import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import dashboardService from "../../services/dashboardService";

const VendaPendentesCard = () => {
  const [vendasPendentes, setVendasPendentes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendasPendentes = async () => {
      try {
        const response = await dashboardService.getVendasPendentes();
        setVendasPendentes(Math.round(response[0].totalPendentes)); // Arredonda para remover casas decimais
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar vendas pendentes:", error);
        setIsLoading(false);
      }
    };

    fetchVendasPendentes();
  }, []);

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  if (vendasPendentes === null) {
    return <Typography>Não há dados disponíveis</Typography>;
  }

  return (
    <Card sx={{ mb: 4, backgroundColor: "#d9d682", color: "#fff" }}>
      <CardContent>
        <Typography variant="h8" gutterBottom>
          Vendas Pendentes
        </Typography>
        <Typography variant="h6">
          {vendasPendentes.toLocaleString("pt-BR")}{" "}
          {/* Formata o número com separadores */}
        </Typography>
        <Typography>Ano</Typography>
      </CardContent>
    </Card>
  );
};

export default VendaPendentesCard;
