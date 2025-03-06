import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function EtsyDataOverview({ etsyData }) {
  // 1. Verificamos que etsyData y etsyData.products existan
  if (!etsyData || !etsyData.products) {
    return (
      <MDBox mt={4}>
        <MDTypography variant="h6" color="error">
          No Etsy data found or still loading...
        </MDTypography>
      </MDBox>
    );
  }

  return (
    <MDBox mt={4}>
      <Grid container spacing={3}>
        {/* Card for Total Sales */}
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="info"
            icon="attach_money"
            title="Total Sales"
            count={etsyData.sales}
            percentage={{
              color: "success",
              amount: "+0%", // Ajusta si tienes datos históricos
              label: "Since last sync",
            }}
          />
        </Grid>

        {/* Card for Orders */}
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="success"
            icon="shopping_cart"
            title="Orders"
            count={etsyData.orders}
            percentage={{
              color: "success",
              amount: "+0%",
              label: "Since last sync",
            }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

EtsyDataOverview.propTypes = {
  etsyData: PropTypes.shape({
    sales: PropTypes.number,
    orders: PropTypes.number,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ),
  }),
};

export default EtsyDataOverview;
