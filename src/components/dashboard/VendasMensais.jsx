import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dashboardService from "../../services/dashboardService";

const VendasMensais = () => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    const fetchVendasMensais = async () => {
      try {
        const data = await dashboardService.getVendasMensais();
        const seriesData = data.map((item) => Math.round(item.data)); 
        const categoriesData = data.map((item) => item.label);

        setChartData({
          series: [{ name: "Vendas Mensais", data: seriesData }],
          categories: categoriesData,
        });
      } catch (error) {
        console.error("Erro ao buscar as vendas mensais:", error);
      }
    };

    fetchVendasMensais();
  }, []);

  const options = {
    chart: {
      id: "vendas-mensais",
    },
    colors: ["#083008"],
    xaxis: {
      categories: chartData.categories,
    },
    title: {
      text: "Vendas Mensais (Ano Corrente)",
      align: "center",
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => Math.round(value).toString(), 
      style: {
        colors: ["#FFFFFF"], 
      },
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

export default VendasMensais;
