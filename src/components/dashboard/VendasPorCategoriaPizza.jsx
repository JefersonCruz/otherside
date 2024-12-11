import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dashboardService from "../../services/dashboardService";

const VendasPorCategoriaPizza = () => {
  const [chartData, setChartData] = useState({
    series: [], // Valores para o gráfico de pizza
    labels: [], // Categorias para o gráfico de pizza
  });

  useEffect(() => {
    const fetchVendasPorCategoria = async () => {
      try {
        const data = await dashboardService.getVendasPorCategoria();

        if (Array.isArray(data)) {
          const seriesData = data.map((item) => Math.round(item.data) || 0); // Valores numéricos
          const labelsData = data.map((item) => item.label || ""); // Categorias

          console.log("Series Data (Pizza):", seriesData);
          console.log("Labels Data:", labelsData);

          setChartData({
            series: seriesData,
            labels: labelsData,
          });
        } else {
          console.error("Dados inválidos para gráfico de pizza", data);
        }
      } catch (error) {
        console.error("Erro ao buscar vendas por categorias:", error);
      }
    };

    fetchVendasPorCategoria();
  }, []);

  const options = {
    chart: {
      type: "pie",
    },
    labels: chartData.labels,
    title: {
      text: "Vendas por Categoria (Ano Corrente)",
      align: "center",
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${Math.round(value)}%`,
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={chartData.series}
        type="pie"
        height={320}
      />
    </div>
  );
};

export default VendasPorCategoriaPizza;
