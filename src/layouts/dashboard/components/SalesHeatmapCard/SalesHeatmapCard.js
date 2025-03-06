import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const DAYS = ["D", "L", "M", "X", "J", "V", "S"];
const DISPLAY_HOURS = [
  { hour: 4, label: "4am" },
  { hour: 8, label: "8am" },
  { hour: 12, label: "12pm" },
  { hour: 16, label: "4pm" },
  { hour: 20, label: "8pm" },
  { hour: 0, label: "12am" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  if (i === 0) return "12am";
  if (i === 12) return "12pm";
  return i > 12 ? `${i - 12}pm` : `${i}am`;
});

function SalesHeatmapCard({ salesData }) {
  // Crear matriz de datos
  const dataMatrix = Array(7)
    .fill()
    .map(() => Array(24).fill(0));
  salesData.forEach(({ day, hour, sales }) => {
    dataMatrix[day][hour] = sales;
  });

  // Encontrar el valor máximo para normalizar la intensidad del color
  const maxSales = Math.max(...salesData.map((d) => d.sales));

  return (
    <Card sx={{ height: "100%", backgroundColor: "white", p: 3, boxShadow: "none" }}>
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h6" fontWeight="medium">
            Ventas por Hora
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={2}>
          <MDTypography variant="button" color="text">
            Intensidad del color indica volumen de ventas
          </MDTypography>
        </MDBox>

        <Box
          sx={{
            border: "1px solid #e9ecef",
            borderRadius: "8px",
            p: 3,
            overflow: "hidden",
            position: "relative",
            minHeight: "250px",
          }}
        >
          {/* Grid principal */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40px repeat(24, minmax(0, 1fr)) 40px",
              gridTemplateRows: "30px repeat(7, minmax(0, 1fr)) 20px",
              gap: 1,
              height: "100%",
              margin: "0 auto",
              maxWidth: "100%",
            }}
          >
            {/* Headers de horas */}
            <Box sx={{ gridColumn: "1 / 2", gridRow: "1 / 2" }} />
            {/* Columna izquierda vacía */}
            {Array.from({ length: 24 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  gridColumn: `${i + 2} / ${i + 3}`,
                  gridRow: "1 / 2",
                  textAlign: "center",
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "#7b809a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 2px",
                }}
              >
                {DISPLAY_HOURS.find((h) => h.hour === i)?.label || ""}
              </Box>
            ))}
            <Box sx={{ gridColumn: "26 / 27", gridRow: "1 / 2" }} />
            {/* Columna derecha vacía */}

            {/* Días y datos */}
            {dataMatrix.map((row, dayIndex) => (
              <React.Fragment key={dayIndex}>
                {/* Inicial del día */}
                <Box
                  sx={{
                    gridColumn: "1 / 2",
                    gridRow: `${dayIndex + 2} / ${dayIndex + 3}`,
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#7b809a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {DAYS[dayIndex]}
                </Box>

                {/* Celdas de datos */}
                {row.map((value, hourIndex) => (
                  <Box
                    key={hourIndex}
                    sx={{
                      gridColumn: `${hourIndex + 2} / ${hourIndex + 3}`,
                      gridRow: `${dayIndex + 2} / ${dayIndex + 3}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      aspectRatio: "1/1",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        width: "70%",
                        paddingBottom: "70%",
                        borderRadius: "50%",
                        backgroundColor:
                          value > 0
                            ? `rgba(76, 175, 80, ${Math.min(0.1 + (value / maxSales) * 0.9, 1)})`
                            : "#f8f9fa",
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.1)",
                          backgroundColor:
                            value > 0
                              ? `rgba(76, 175, 80, ${Math.min(0.2 + (value / maxSales) * 0.8, 1)})`
                              : "#f0f0f0",
                        },
                      },
                    }}
                    title={
                      value > 0 ? `${DAYS[dayIndex]} ${HOURS[hourIndex]}: ${value} ventas` : ""
                    }
                  />
                ))}

                {/* Columna derecha vacía */}
                <Box
                  sx={{
                    gridColumn: "26 / 27",
                    gridRow: `${dayIndex + 2} / ${dayIndex + 3}`,
                  }}
                />
              </React.Fragment>
            ))}

            {/* Fila inferior vacía */}
            {Array.from({ length: 26 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  gridColumn: `${i + 1} / ${i + 2}`,
                  gridRow: "9 / 10",
                }}
              />
            ))}
          </Box>
        </Box>
      </MDBox>
    </Card>
  );
}

SalesHeatmapCard.propTypes = {
  salesData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      hour: PropTypes.number.isRequired,
      sales: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SalesHeatmapCard;
