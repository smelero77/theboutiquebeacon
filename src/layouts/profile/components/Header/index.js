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
import { Typography, Avatar, Space } from "antd";

const { Title, Text } = Typography;

function Header() {
  return (
    <div style={{ marginBottom: "24px" }}>
      <Space align="center" size="large">
        <Avatar size={64} src="https://via.placeholder.com/64" />
        <div>
          <Title level={2}>Alec M. Thompson</Title>
          <Text type="secondary">CEO / Co-Founder</Text>
        </div>
      </Space>
    </div>
  );
}

export default Header;
