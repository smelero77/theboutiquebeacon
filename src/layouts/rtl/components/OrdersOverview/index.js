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
import { Card, Typography, Timeline } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function OrdersOverview() {
  return (
    <Card>
      <Title level={4}>Orders Overview</Title>
      <Timeline>
        <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />} color="green">
          <Text>Order #1832412 was placed</Text>
          <Text type="secondary" style={{ display: "block" }}>
            2 hours ago
          </Text>
        </Timeline.Item>
        <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />} color="green">
          <Text>Order #1832411 was placed</Text>
          <Text type="secondary" style={{ display: "block" }}>
            3 hours ago
          </Text>
        </Timeline.Item>
        <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />} color="green">
          <Text>Order #1832410 was placed</Text>
          <Text type="secondary" style={{ display: "block" }}>
            4 hours ago
          </Text>
        </Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />} color="blue">
          <Text>Order #1832409 was placed</Text>
          <Text type="secondary" style={{ display: "block" }}>
            5 hours ago
          </Text>
        </Timeline.Item>
      </Timeline>
    </Card>
  );
}

export default OrdersOverview;
