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
import { Card, Typography, Button, Table } from "antd";

const { Title } = Typography;

function Invoices() {
  const columns = [
    {
      title: "Número",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
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
      number: "INV-001",
      date: "2024-03-01",
      amount: "$100.00",
      status: "Pagado",
    },
    {
      key: "2",
      number: "INV-002",
      date: "2024-03-02",
      amount: "$200.00",
      status: "Pendiente",
    },
  ];

  return (
    <Card title="Facturas">
      <Button type="primary" style={{ marginBottom: "16px" }}>
        Nueva Factura
      </Button>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
}

export default Invoices;
