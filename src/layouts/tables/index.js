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
import { Layout, Typography } from "antd";
import DataTable from "../../components/DataTable";

const { Content } = Layout;
const { Title } = Typography;

function Tables() {
  return (
    <Layout>
      <Content style={{ padding: "24px" }}>
        <Title level={2}>Tablas</Title>
        <DataTable />
      </Content>
    </Layout>
  );
}

export default Tables;
