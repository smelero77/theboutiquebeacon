import React from "react";
import PropTypes from "prop-types";
import { Card, Table } from "antd";
import dayjs from "dayjs";

function SalesTable({ data }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "receipt_id",
      key: "receipt_id",
    },
    {
      title: "Fecha",
      dataIndex: "create_timestamp",
      key: "create_timestamp",
      render: (timestamp) => dayjs.unix(timestamp).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Vendedor",
      dataIndex: "seller_email",
      key: "seller_email",
    },
    {
      title: "Comprador",
      dataIndex: "buyer_email",
      key: "buyer_email",
    },
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => `$${price.toFixed(2)}`,
    },
  ];

  return (
    <Card title="Ventas Recientes">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="receipt_id"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </Card>
  );
}

SalesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      receipt_id: PropTypes.number.isRequired,
      create_timestamp: PropTypes.number.isRequired,
      seller_email: PropTypes.string.isRequired,
      buyer_email: PropTypes.string.isRequired,
      total_price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SalesTable;
