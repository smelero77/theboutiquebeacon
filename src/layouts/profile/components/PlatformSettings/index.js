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
import { Card, Switch, Typography, Space } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

function PlatformSettings({ settings }) {
  return (
    <Card>
      <Title level={4}>Configuración de la Plataforma</Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        {settings.map((setting) => (
          <div
            key={setting.id}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <Text>{setting.name}</Text>
            <Switch defaultChecked={setting.defaultChecked} />
          </div>
        ))}
      </Space>
    </Card>
  );
}

PlatformSettings.propTypes = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      defaultChecked: PropTypes.bool,
    })
  ).isRequired,
};

PlatformSettings.defaultProps = {
  settings: [
    {
      id: "email",
      name: "Notificaciones por Email",
      defaultChecked: true,
    },
    {
      id: "sms",
      name: "Notificaciones por SMS",
      defaultChecked: false,
    },
    {
      id: "push",
      name: "Notificaciones Push",
      defaultChecked: true,
    },
    {
      id: "two-factor",
      name: "Autenticación de Dos Factores",
      defaultChecked: false,
    },
  ],
};

export default PlatformSettings;
