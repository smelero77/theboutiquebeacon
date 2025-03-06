import React from "react";
import { Table, Typography, Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Invoices() {
  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<DownloadOutlined />}>
            Download
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      invoiceNumber: "INV-001",
      date: "2024-03-01",
      amount: "$100.00",
      status: "Paid",
    },
    {
      key: "2",
      invoiceNumber: "INV-002",
      date: "2024-03-02",
      amount: "$200.00",
      status: "Pending",
    },
    {
      key: "3",
      invoiceNumber: "INV-003",
      date: "2024-03-03",
      amount: "$300.00",
      status: "Paid",
    },
  ];

  return (
    <div>
      <Title level={4}>Invoices</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Invoices;
