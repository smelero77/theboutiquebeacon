import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

function SalesByCountryWithMap({ orders }) {
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
    acc[country].sales += order.amount;
    return acc;
  }, {});

  // Calcular el total de ventas
  const totalSales = Object.values(salesByCountry).reduce((sum, country) => sum + country.sales, 0);

  // Calcular porcentajes y convertir a array
  const data = Object.values(salesByCountry).map((country) => ({
    ...country,
    percentage: ((country.sales / totalSales) * 100).toFixed(1),
  }));

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
      render: (sales) => `$${sales.toFixed(2)}`,
    },
    {
      title: "% del Total",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => `${percentage}%`,
    },
  ];

  return (
    <Table dataSource={data} columns={columns} pagination={false} rowKey="country" size="small" />
  );
}

SalesByCountryWithMap.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default SalesByCountryWithMap;
