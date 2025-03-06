/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { Card, Typography, Table } from "antd";

const { Title } = Typography;

function Transactions() {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    },
  ];

  const data = [
    {
      key: "1",
      date: "2024-03-01",
      description: "Pago de factura INV-001",
      amount: "$100.00",
      status: "Completado",
    },
    {
      key: "2",
      date: "2024-03-02",
      description: "Pago de factura INV-002",
      amount: "$200.00",
      status: "Pendiente",
    },
  ];

  return (
    <Card title="Transacciones">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
}

export default Transactions;
