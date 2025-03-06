import React from "react";
import PropTypes from "prop-types";
import { Card, Spin } from "antd";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DailySales = ({ data, loading }) => {
  const formatEuro = (value) => `€${Number(value).toFixed(2)}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0 }}>{`Fecha: ${label}`}</p>
          <p style={{ margin: 0, color: "#1890ff" }}>{`Ventas: ${formatEuro(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card title="Ventas Diarias">
      {loading ? (
        <Spin />
      ) : data && data.length > 0 ? (
        <div style={{ width: "100%", height: "300px", marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                scale="band"
              />
              <YAxis tickFormatter={formatEuro} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="sales" fill="#e6f7ff" name="Ventas" barSize={20} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#1890ff"
                strokeWidth={2}
                dot={{ fill: "#1890ff", r: 4 }}
                activeDot={{ r: 6 }}
                name="Tendencia"
              />
            </ComposedChart>
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

DailySales.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      sales: PropTypes.number.isRequired,
    })
  ),
  loading: PropTypes.bool,
};

DailySales.defaultProps = {
  data: [],
  loading: false,
};

export default DailySales;
