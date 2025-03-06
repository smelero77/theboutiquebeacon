import React from "react";
import { Table, Typography, Tag, Space } from "antd";

const { Title } = Typography;

function Transactions() {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      render: (status) => {
        const colors = {
          completed: "success",
          pending: "warning",
          failed: "error",
        };
        return <Tag color={colors[status.toLowerCase()]}>{status}</Tag>;
      },
    },
  ];

  const data = [
    {
      key: "1",
      transactionId: "TRX-001",
      date: "2024-03-01",
      description: "Monthly Subscription",
      amount: "$50.00",
      status: "Completed",
    },
    {
      key: "2",
      transactionId: "TRX-002",
      date: "2024-03-02",
      description: "Additional Service",
      amount: "$25.00",
      status: "Pending",
    },
    {
      key: "3",
      transactionId: "TRX-003",
      date: "2024-03-03",
      description: "Annual Plan",
      amount: "$500.00",
      status: "Failed",
    },
  ];

  return (
    <div>
      <Title level={4}>Transactions</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Transactions;
