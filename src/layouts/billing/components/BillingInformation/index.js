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
import { Card, Typography, Form, Input, Button } from "antd";

const { Title } = Typography;

function BillingInformation() {
  return (
    <Card title="Información de Facturación">
      <Form layout="vertical">
        <Form.Item label="Nombre" required>
          <Input placeholder="Tu nombre" />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input placeholder="tu@email.com" />
        </Form.Item>
        <Form.Item label="Dirección" required>
          <Input placeholder="Tu dirección" />
        </Form.Item>
        <Form.Item label="Ciudad" required>
          <Input placeholder="Tu ciudad" />
        </Form.Item>
        <Form.Item label="País" required>
          <Input placeholder="Tu país" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Guardar Cambios</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BillingInformation;
