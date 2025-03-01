// src/layouts/dashboard/index.js

import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import Projects from "./components/Projects";
import OrdersOverview from "./components/OrdersOverview";
import EtsyDataOverview from "./components/EtsyDataOverview";
import SalesByCountryWithMap from "./components/SalesByCountryWithMap";

import reportsBarChartData from "./data/reportsBarChartData";
import reportsLineChartData from "./data/reportsLineChartData";

// IMPORTA LA FUNCIÓN DESDE TU NUEVO ARCHIVO:
import { fetchEtsyData } from "services/apiEtsy";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  // Estados
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [receipts, setReceipts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Llamada a /api/etsy-data (vía fetchEtsyData)
        const data = await fetchEtsyData();
        // data => { raw, parse: { totalSales, totalOrders, markers } }

        // Ej: guardar la parte parse
        setTotalSales(data.parse.totalSales);
        setTotalOrders(data.parse.totalOrders);
        setMarkers(data.parse.markers);

        // Guardar la parte raw (por si la muestras en EtsyDataOverview)
        setReceipts(data.raw);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Tarjetas de estadísticas */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={loading ? "..." : totalOrders}
                percentage={{ color: "success", amount: "+55%", label: "than last week" }}
              />
            </MDBox>
          </Grid>
          {/* ... otras tarjetas */}
        </Grid>

        {/* Gráficos */}
        {/* ... ReportsBarChart, ReportsLineChart, etc. */}

        {/* Sección Etsy */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {loading ? (
                <MDTypography variant="h6" textAlign="center">
                  Loading Etsy data...
                </MDTypography>
              ) : error ? (
                <MDTypography variant="h6" color="error" textAlign="center">
                  Error fetching Etsy data.
                </MDTypography>
              ) : (
                <EtsyDataOverview etsyData={receipts} />
              )}
            </Grid>
          </Grid>
        </MDBox>

        {/* Mapa con markers */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SalesByCountryWithMap
                title="Sales by Country"
                subtitle="Check the sales, value and bounce rate by country."
                data={[
                  { country: "USA", sales: 25, value: "$300", bounce: "10%" },
                  { country: "Germany", sales: 12, value: "$200", bounce: "15%" },
                  { country: "Spain", sales: 8, value: "$120", bounce: "9%" },
                ]}
                mapConfig={{
                  markers: markers,
                }}
              />
            </Grid>
          </Grid>
        </MDBox>

        {/* Resto (Projects, OrdersOverview, etc.) */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
