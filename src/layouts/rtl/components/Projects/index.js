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
import { Card, Typography, Table, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Projects() {
  const columns = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Completion",
      dataIndex: "completion",
      key: "completion",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
          }
        >
          <MoreOutlined style={{ fontSize: "20px" }} />
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      project: "Material XD Version",
      budget: "$14,000",
      status: "Completed",
      completion: "60%",
    },
    {
      key: "2",
      project: "Add Progress Track",
      budget: "$3,000",
      status: "In Progress",
      completion: "30%",
    },
    {
      key: "3",
      project: "Fix Platform Errors",
      budget: "Not set",
      status: "Completed",
      completion: "100%",
    },
    {
      key: "4",
      project: "Launch our Mobile App",
      budget: "$32,000",
      status: "In Progress",
      completion: "45%",
    },
  ];

  return (
    <Card>
      <Title level={4}>Projects</Title>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
}

export default Projects;
