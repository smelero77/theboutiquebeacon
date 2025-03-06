import React from "react";
import PropTypes from "prop-types";
import { Card, Table, Empty } from "antd";
import dayjs from "dayjs";

function SalesTable({ data = [] }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "receipt_id",
      key: "receipt_id",
      render: (id) => id || "-",
    },
    {
      title: "Fecha",
      dataIndex: "create_timestamp",
      key: "create_timestamp",
      render: (timestamp) => (timestamp ? dayjs.unix(timestamp).format("DD/MM/YYYY HH:mm") : "-"),
    },
    {
      title: "Vendedor",
      dataIndex: "seller_email",
      key: "seller_email",
      render: (email) => email || "-",
    },
    {
      title: "Comprador",
      dataIndex: "buyer_email",
      key: "buyer_email",
      render: (email) => email || "-",
    },
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => `$${(Number(price) || 0).toFixed(2)}`,
    },
  ];

  if (!data || data.length === 0) {
    return (
      <Card title="Ventas Recientes">
        <Empty description="No hay ventas recientes" />
      </Card>
    );
  }

  return (
    <Card title="Ventas Recientes">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.receipt_id || Math.random().toString()}
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
      receipt_id: PropTypes.number,
      create_timestamp: PropTypes.number,
      seller_email: PropTypes.string,
      buyer_email: PropTypes.string,
      total_price: PropTypes.number,
    })
  ),
};

SalesTable.defaultProps = {
  data: [],
};

export default SalesTable;
