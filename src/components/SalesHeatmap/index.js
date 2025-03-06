import React from "react";
import PropTypes from "prop-types";
import { Card, Spin } from "antd";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const formatEuro = (value) => `€${Number(value).toFixed(2)}`;

const HOURS = ["4am", "8am", "noon", "4pm", "8pm", "12am"];
const DAYS_MAP = {
  0: "S",
  1: "M",
  2: "T",
  3: "W",
  4: "T",
  5: "F",
  6: "S",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
      <div
        style={{
          backgroundColor: "transparent",
          padding: "5px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        <div>{`${dayNames[data.day]} ${data.hour}:00`}</div>
        <div style={{ color: "#25CF5E" }}>{`€${data.sales.toFixed(2)}`}</div>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        day: PropTypes.number,
        hour: PropTypes.number,
        sales: PropTypes.number,
      }),
    })
  ),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
};

const SalesHeatmap = ({ data, loading }) => {
  const getColor = (sales) => {
    const maxSales = Math.max(...data.map((item) => item.sales));
    const intensity = sales / maxSales;
    return `rgba(37, 207, 94, ${Math.max(0.1, intensity)})`;
  };

  return (
    <Card title="Mapa de Calor de Ventas" bordered={false}>
      {loading ? (
        <Spin />
      ) : data && data.length > 0 ? (
        <div style={{ width: "100%", height: "300px", marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 30,
                right: 30,
                bottom: 40,
                left: 40,
              }}
            >
              <XAxis
                type="number"
                dataKey="hour"
                domain={[0, 23]}
                ticks={[4, 8, 12, 16, 20, 24]}
                tickFormatter={(value, index) => HOURS[index]}
                orientation="top"
                axisLine={false}
                tickLine={false}
                style={{
                  fontSize: "12px",
                  fontFamily: "Arial",
                  fill: "#666",
                }}
              />
              <YAxis
                type="number"
                dataKey="day"
                domain={[0, 6]}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
                tickFormatter={(value) => DAYS_MAP[value]}
                reversed
                axisLine={false}
                tickLine={false}
                style={{
                  fontSize: "12px",
                  fontFamily: "Arial",
                  fill: "#666",
                }}
                padding={{ top: 20, bottom: 20 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                wrapperStyle={{ zIndex: 100 }}
                position={{ y: -10 }}
              />
              <Scatter data={data} shape="circle" fillOpacity={1}>
                {data.map((entry, index) => (
                  <circle key={`cell-${index}`} r={4} fill={getColor(entry.sales)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          No hay datos disponibles para el rango de fechas seleccionado
        </div>
      )}
    </Card>
  );
};

SalesHeatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      hour: PropTypes.number.isRequired,
      sales: PropTypes.number.isRequired,
    })
  ),
  loading: PropTypes.bool,
};

SalesHeatmap.defaultProps = {
  data: [],
  loading: false,
};

export default SalesHeatmap;
