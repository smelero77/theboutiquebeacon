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
  Card,
} from "@mui/material";
import { Icon } from "@mui/material";

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
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            {title}
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{ fontWeight: "bold", color: ({ palette: { info } }) => info.main, mt: -0.5 }}
            >
              public
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {subtitle}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>
        <Grid container>
          <Grid item xs={12} md={7} lg={7}>
            <VectorMap
              map={worldMerc}
              zoomOnScroll={false}
              zoomButtons={false}
              markersSelectable={false}
              backgroundColor="transparent"
              markers={mapConfig?.markers || []}
              markerStyle={{
                initial: {
                  fill: "#1A73E8",
                  stroke: "#1A73E8",
                  "stroke-width": 1,
                  r: 5,
                },
              }}
              onRegionTipShow={() => false}
              onMarkerTipShow={() => false}
              containerStyle={{
                width: "100%",
                height: "100%",
              }}
              regionStyle={{
                initial: {
                  fill: "#dee2e7",
                  "fill-opacity": 1,
                  stroke: "none",
                  "stroke-width": 0,
                  "stroke-opacity": 0,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <MDBox p={3}>
              {tableData.map(({ country, sales, value, bounce }, index) => (
                <MDBox
                  key={country}
                  component="li"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                  pr={1}
                >
                  <MDBox display="flex" alignItems="center">
                    <MDBox mr={2}>
                      <MDTypography variant="button" fontWeight="medium" color="text">
                        {country}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" alignItems="center">
                    <MDBox mr={2}>
                      <MDTypography variant="button" fontWeight="medium">
                        {sales}
                      </MDTypography>
                    </MDBox>
                    <MDTypography variant="button" fontWeight="medium">
                      {value}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              ))}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
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
