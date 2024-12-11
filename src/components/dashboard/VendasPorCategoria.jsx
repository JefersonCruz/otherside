import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dashboardService from "../../services/dashboardService";

const VendasPorCategoria = () => {
  const [chartData, setChartData] = useState({
    series: [{ data: [] }],
    categories: [],
  });

  useEffect(() => {
    const fetchVendasPorCategoria = async () => {
      try {
        const data = await dashboardService.getVendasPorCategoria();

        if (Array.isArray(data)) {
          const seriesData = data.map((item) => Math.round(item.data) || 0);
          const categoriesData = data.map((item) => item.label || "");

          console.log("Series Data:", seriesData);
          console.log("Categories:", categoriesData);

          setChartData({
            series: [{ data: seriesData }],
            categories: categoriesData,
          });
        } else {
          console.error("Dados de categoria inválidos", data);
        }
      } catch (error) {
        console.error("Erro ao buscar vendas por categorias:", error);
      }
    };

    fetchVendasPorCategoria();
  }, []);

  const options = {
    chart: {
      type: "bar",
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => Math.round(value).toString(),
      style: {
        colors: ["#FFFFFF"],
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    title: {
      text: "Vendas por Categoria (Ano Corrente)",
      align: "center",
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={chartData.series}
        type="bar"
        height={320}
      />
    </div>
  );
};

export default VendasPorCategoria;
