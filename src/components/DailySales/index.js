import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const { Title } = Typography;

// Componente CustomTooltip con PropTypes
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <Card size="small" style={{ border: "1px solid #f0f0f0" }}>
      <p style={{ margin: 0 }}>
        <strong>Fecha:</strong> {dayjs(label).format("DD/MM/YYYY")}
      </p>
      <p style={{ margin: 0 }}>
        <strong>Ventas:</strong> ${payload[0]?.value?.toFixed(2) || 0}
      </p>
    </Card>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: "",
};

// Componente principal DailySales
const DailySales = ({ data, loading }) => {
  // Procesar los datos para el gráfico
  const chartData = React.useMemo(() => {
    const salesByDay = {};

    data.forEach((order) => {
      const date = dayjs(order.created_at).format("YYYY-MM-DD");
      salesByDay[date] = (salesByDay[date] || 0) + order.total_amount;
    });

    return Object.entries(salesByDay).map(([date, amount]) => ({
      date,
      amount,
    }));
  }, [data]);

  return (
    <Card loading={loading}>
      <Title level={4}>Ventas Diarias</Title>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("DD/MM")} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

DailySales.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      total_amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
};

DailySales.defaultProps = {
  loading: false,
};

export default DailySales;
