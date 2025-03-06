import React from "react";
import { Table, Card, Spin, Empty } from "antd";
import PropTypes from "prop-types";

function SalesByCountryWithMap({ orders = [], loading = false }) {
  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <Card title="Ventas por País">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin />
        </div>
      </Card>
    );
  }

  // Si no hay órdenes, mostrar mensaje de no datos
  if (!orders || orders.length === 0) {
    return (
      <Card title="Ventas por País">
        <Empty description="No hay datos disponibles" />
      </Card>
    );
  }

  // Procesar los datos para obtener ventas por país
  const salesByCountry = orders.reduce((acc, order) => {
    const country = order.country || "Desconocido";
    if (!acc[country]) {
      acc[country] = {
        country,
        sales: 0,
        percentage: 0,
      };
    }
    acc[country].sales += order.total_amount || 0;
    return acc;
  }, {});

  // Si no hay datos procesados, mostrar mensaje de no datos
  if (Object.keys(salesByCountry).length === 0) {
    return (
      <Card title="Ventas por País">
        <Empty description="No hay datos de países disponibles" />
      </Card>
    );
  }

  // Calcular el total de ventas
  const totalSales = Object.values(salesByCountry).reduce((sum, country) => sum + country.sales, 0);

  // Calcular porcentajes y convertir a array
  const data = Object.values(salesByCountry)
    .map((country) => ({
      ...country,
      percentage: ((country.sales / totalSales) * 100).toFixed(1),
    }))
    .sort((a, b) => b.sales - a.sales); // Ordenar por ventas descendente

  const columns = [
    {
      title: "País",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Ventas",
      dataIndex: "sales",
      key: "sales",
      render: (sales) => `€${(Number(sales) || 0).toFixed(2)}`,
      sorter: (a, b) => (Number(b.sales) || 0) - (Number(a.sales) || 0),
    },
    {
      title: "% del Total",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => `${percentage}%`,
      sorter: (a, b) => b.percentage - a.percentage,
    },
  ];

  return (
    <Card title="Ventas por País">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="country"
        size="small"
        loading={loading}
      />
    </Card>
  );
}

SalesByCountryWithMap.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string,
      total_amount: PropTypes.number,
    })
  ),
  loading: PropTypes.bool,
};

SalesByCountryWithMap.defaultProps = {
  orders: [],
  loading: false,
};

export default SalesByCountryWithMap;
