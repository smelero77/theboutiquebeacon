import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function StatisticsCard({ title, value, percentage, icon }) {
  const icons = {
    sales: <ShowChartIcon sx={{ fontSize: 28, color: "#344767" }} />,
    average: <TimelineIcon sx={{ fontSize: 28, color: "#344767" }} />,
    orders: <ShoppingCartIcon sx={{ fontSize: 28, color: "#344767" }} />,
  };

  const formattedValue =
    title.toLowerCase().includes("sales") || title.toLowerCase().includes("average")
      ? formatCurrency(value)
      : value.toString();

  return (
    <Card sx={{ height: "100%", backgroundColor: "white", boxShadow: "none" }}>
      <MDBox p={2} display="flex" alignItems="center" justifyContent="space-between">
        <MDBox display="flex" flexDirection="column">
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
          <MDTypography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
            {formattedValue}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection="column" alignItems="flex-end">
          {icons[icon]}
          <MDTypography
            variant="button"
            color="success"
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              fontWeight: "bold",
              fontSize: "0.75rem",
            }}
          >
            +{percentage.toFixed(1)}%
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

StatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  icon: PropTypes.oneOf(["sales", "average", "orders"]).isRequired,
};

function StatisticsCards({ data }) {
  // Calcular porcentajes (esto debería venir de los datos reales en una implementación completa)
  const percentages = {
    sales: 30,
    average: 30,
    orders: 33,
  };

  return (
    <MDBox display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
      <StatisticsCard
        title="Net Sales"
        value={data.netSales}
        percentage={percentages.sales}
        icon="sales"
      />
      <StatisticsCard
        title="Daily Average"
        value={data.dailyAverage}
        percentage={percentages.average}
        icon="average"
      />
      <StatisticsCard
        title="Orders"
        value={data.orders}
        percentage={percentages.orders}
        icon="orders"
      />
    </MDBox>
  );
}

StatisticsCards.propTypes = {
  data: PropTypes.shape({
    netSales: PropTypes.number.isRequired,
    dailyAverage: PropTypes.number.isRequired,
    orders: PropTypes.number.isRequired,
  }).isRequired,
};

export default StatisticsCards;
