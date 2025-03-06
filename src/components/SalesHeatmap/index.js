import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Card, Spin, Empty } from "antd";
import { Heatmap } from "@ant-design/plots";
import dayjs from "dayjs";

const HOURS = ["4am", "8am", "noon", "4pm", "8pm", "12am"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

const SalesHeatmap = ({ orders = [], loading = false }) => {
  // Generar los datos base del heatmap
  const data = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return [];

    const heatmapData = [];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        heatmapData.push({
          day,
          hour,
          sales: 0,
          orders: 0,
        });
      }
    }

    // Procesar órdenes y sumar ventas
    orders.forEach((order) => {
      const orderDate = order.order_date || order.created_at;
      if (!orderDate) return;

      const date = dayjs(orderDate);
      const day = date.day();
      const hour = date.hour();
      const amount = Number(order.total_amount) || 0;

      const point = heatmapData.find((p) => p.day === day && p.hour === hour);
      if (point) {
        point.sales += amount;
        point.orders += 1;
      }
    });

    return heatmapData;
  }, [orders]);

  // Configuración del heatmap con Ant Design Plots
  const config = {
    data,
    xField: "hour",
    yField: "day",
    colorField: "sales",
    shape: "square",
    sizeRatio: 1, // Mantener todos los cuadrados iguales
    color: ["#e0e0e0", "#7eadfc", "#fd8b6f", "#aa3523"], // De gris claro a rojo
    xAxis: {
      title: null,
      label: {
        formatter: (v) => HOURS[Number(v) / 4], // Mostrar horas en formato texto
      },
    },
    yAxis: {
      title: null,
      label: {
        formatter: (v) => DAYS_SHORT[Number(v)], // Mostrar días en formato corto
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: `${DAYS[datum.day]} ${datum.hour}:00`,
        value: `Sales: €${datum.sales.toFixed(2)}, Orders: ${datum.orders}`,
      }),
    },
  };

  return (
    <Card
      title="Sales Heatmap"
      variant="outlined"
      style={{
        fontFamily: "Montserrat, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderRadius: "8px",
      }}
      headStyle={{
        fontWeight: "500",
        fontSize: "16px",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {loading ? (
        <Spin />
      ) : data.length === 0 ? (
        <Empty description="No data available" />
      ) : (
        <Heatmap {...config} />
      )}
    </Card>
  );
};

SalesHeatmap.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      order_date: PropTypes.string,
      created_at: PropTypes.string,
      total_amount: PropTypes.number,
    })
  ),
  loading: PropTypes.bool,
};

SalesHeatmap.defaultProps = {
  orders: [],
  loading: false,
};

export default SalesHeatmap;
