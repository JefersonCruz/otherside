import React from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";
import VendasMensais from "./VendasMensais";
import VendasPorClientes from "./VendasPorClientes";
import VendasPorCategoria from "./VendasPorCategoria";
import MaiorVendaCard from "./MaiorVendaCard";
import MediaVendaCard from "./MediaVendaCard";
import VendasPendentesCard from "./VendasPendentesCard";
import VendasPorCategoriaPizza from "./VendasPorCategoriaPizza";
import VendasPorCategoriaPizzaChartJS from "./VendasPorCategoriaPizzaChartJS"; // Importando o novo gráfico

const Dashboard = () => {
  const spacing = 2;
  const cardHeight = 120; // Definindo uma altura constante para todos os cartões

  return (
    <Container maxWidth="lg" sx={{ marginTop: spacing * 2 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: spacing * 2 }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: spacing,
          marginBottom: spacing * 2,
        }}
      >
        <Box sx={{ minHeight: cardHeight }}>
          <MaiorVendaCard />
        </Box>
        <Box sx={{ minHeight: cardHeight }}>
          <MediaVendaCard />
        </Box>
        <Box sx={{ minHeight: cardHeight }}>
          <VendasPendentesCard />
        </Box>

        <Card
          sx={{ backgroundColor: "#d81b60", color: "#fff", height: cardHeight }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
              Variável 2
            </Typography>
            <Typography variant="h4" sx={{ fontSize: "1.5rem" }}>
              200
            </Typography>
            <Typography sx={{ fontSize: "0.875rem" }}>Período</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: spacing,
          marginBottom: spacing * 2,
        }}
      >
        <Box>
          <VendasMensais />
        </Box>
        <Box>
          <VendasPorCategoria />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: spacing,
          marginBottom: spacing * 2,
        }}
      >
        <Box>
          <VendasPorClientes />
        </Box>
        <Box>
          <VendasPorCategoriaPizza />
        </Box>
      </Box>

      {/* Adicionando uma nova linha para o gráfico de pizza com ChartJS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: spacing,
          marginBottom: spacing * 2,
        }}
      >
        <Box>
          <VendasPorCategoriaPizzaChartJS />{" "}
          {/* Colocando o gráfico ChartJS aqui */}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
