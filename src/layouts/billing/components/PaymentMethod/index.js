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
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

function PaymentMethod() {
  return (
    <Card title="Método de Pago">
      <Title level={4}>Tarjeta de Crédito</Title>
      <Text>**** **** **** 1234</Text>
      <Button type="primary" style={{ marginTop: "16px" }}>
        Cambiar Tarjeta
      </Button>
    </Card>
  );
}

export default PaymentMethod;
