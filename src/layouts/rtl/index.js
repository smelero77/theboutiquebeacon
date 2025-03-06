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
import { Row, Col, Card, Typography } from "antd";
import { useAntDesignController } from "context";

// Components
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";

const { Title } = Typography;

function RTL() {
  const [controller] = useAntDesignController();
  const { direction } = controller;

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <OrdersOverview />
        </Col>
        <Col xs={24} lg={16}>
          <Projects />
        </Col>
      </Row>
    </div>
  );
}

export default RTL;
