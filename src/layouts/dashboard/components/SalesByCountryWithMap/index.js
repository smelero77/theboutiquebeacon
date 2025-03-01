// src/layouts/dashboard/components/SalesByCountryWithMap/index.js
import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Material Dashboard 2 React
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Ajusta este import:
import { VectorMap } from "react-jvectormap";
// Ojo: no "WorldMap"

const defaultData = [
  { country: "United States", sales: 2500, value: "$230,900", bounce: "29.8%" },
  { country: "Germany", sales: 3900, value: "$400,000", bounce: "40.22%" },
  { country: "Great Britain", sales: 1400, value: "$90,700", bounce: "23.44%" },
  { country: "Brasil", sales: 562, value: "$14,980", bounce: "32.04%" },
];

function SalesByCountryWithMap({ title, subtitle, data, mapConfig }) {
  const tableData = data?.length ? data : defaultData;

  // Config base: "map: world_mill"
  const defaultMapConfig = {
    map: "world_mill",
    backgroundColor: "transparent",
    regionStyle: {
      initial: { fill: "#dee2e7" },
      hover: { fill: "#e91e63" },
    },
    markerStyle: {
      initial: {
        fill: "#e91e63",
        stroke: "#ffffff",
        "stroke-width": 2,
      },
      hover: { fill: "#FF5722" },
    },
    markers: [
      { latLng: [37.09, -95.71], name: "USA" },
      { latLng: [51.16, 10.45], name: "Germany" },
      { latLng: [-14.23, -51.92], name: "Brasil" },
    ],
  };

  return (
    <MDBox mt={4}>
      <MDBox mb={2}>
        <MDTypography variant="h5" fontWeight="medium">
          {title || "Sales by Country"}
        </MDTypography>
        <MDTypography variant="button" color="text">
          {subtitle || "Check the sales, value and bounce rate by country."}
        </MDTypography>
      </MDBox>

      <Grid container spacing={3}>
        {/* Tabla */}
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper} sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Country</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Sales</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Value</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Bounce</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.sales}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.bounce}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Mapa */}
        <Grid item xs={12} md={6}>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%", borderRadius: "8px", overflow: "hidden" }}
          >
            <VectorMap
              containerStyle={{
                width: "100%",
                height: "400px",
              }}
              containerClassName="jvectormap-container"
              {...defaultMapConfig}
              {...mapConfig} // si deseas sobrescribir
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

SalesByCountryWithMap.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      sales: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      bounce: PropTypes.string.isRequired,
    })
  ),
  mapConfig: PropTypes.object,
};

export default SalesByCountryWithMap;
