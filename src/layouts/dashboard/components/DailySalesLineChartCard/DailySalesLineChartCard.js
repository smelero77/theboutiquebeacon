import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Registramos los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * Componente que recibe datos agregados diarios y los muestra en un LineChart.
 * @param {Array} dailyData - Array de objetos [{ date: "YYYY-MM-DD", total: number }, ...]
 */
function DailySalesLineChartCard({ dailyData }) {
  const labels = dailyData.map((item) => item.date);
  const dataPoints = dailyData.map((item) => item.total);

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Sales",
        data: dataPoints,
        borderColor: "#4CAF50",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#4CAF50",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          color: "#e9ecef",
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: "#b2b9bf",
          font: {
            size: 11,
          },
          stepSize: 20,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#b2b9bf",
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <Card sx={{ height: "23rem", backgroundColor: "white", p: 3, boxShadow: "none" }}>
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h6" fontWeight="medium">
            Daily Sales
          </MDTypography>
        </MDBox>

        <MDBox display="flex" alignItems="center">
          <MDTypography variant="button" color="success" fontWeight="bold">
            (+15%)
          </MDTypography>
          <MDTypography variant="button" color="text" ml={1}>
            increase in today sales.
          </MDTypography>
        </MDBox>

        <MDBox mt={2} height="14rem">
          <Line data={data} options={options} />
        </MDBox>

        <Divider />

        <MDBox mt={1} display="flex" alignItems="center">
          <MDTypography variant="button" color="text" lineHeight={1}>
            updated 4 min ago
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

DailySalesLineChartCard.propTypes = {
  dailyData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DailySalesLineChartCard;
