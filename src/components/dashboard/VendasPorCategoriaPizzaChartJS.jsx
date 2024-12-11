import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import dashboardService from "../../services/dashboardService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar os módulos do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const VendasPorCategoriaPizzaChartJS = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Categorias
    datasets: [
      {
        data: [], // Valores das categorias
        backgroundColor: [], // Cores para o gráfico
        borderColor: [], // Cor das bordas
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchVendasPorCategoria = async () => {
      try {
        const data = await dashboardService.getVendasPorCategoria();

        if (Array.isArray(data)) {
          const labelsData = data.map((item) => item.label || "");
          const seriesData = data.map((item) => Math.round(item.data) || 0);

          // Gerar cores aleatórias para o gráfico
          const colors = labelsData.map(
            () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
          );

          setChartData({
            labels: labelsData,
            datasets: [
              {
                data: seriesData,
                backgroundColor: colors,
                borderColor: colors.map((color) =>
                  color.replace(", 70%", ", 50%")
                ), // Um pouco mais escuro
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Dados inválidos para o gráfico de pizza", data);
        }
      } catch (error) {
        console.error("Erro ao buscar vendas por categorias:", error);
      }
    };

    fetchVendasPorCategoria();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return ` ${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Vendas por Categoria (Ano Corrente)
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default VendasPorCategoriaPizzaChartJS;
