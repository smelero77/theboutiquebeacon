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

import { useState } from "react";
import { Grid, Card, Typography, Alert, Button, notification } from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

// Layout components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";

const { Title, Text } = Typography;

function Notifications() {
  const [notificationApi, contextHolder] = notification.useNotification();

  const showNotification = (type) => {
    notificationApi[type]({
      message: "Notificación",
      description: "Esta es una notificación de ejemplo",
      placement: "topRight",
    });
  };

  const alertContent = (type) => {
    switch (type) {
      case "primary":
        return "Esta es una alerta primaria";
      case "secondary":
        return "Esta es una alerta secundaria";
      case "success":
        return "Esta es una alerta de éxito";
      case "error":
        return "Esta es una alerta de error";
      case "warning":
        return "Esta es una alerta de advertencia";
      case "info":
        return "Esta es una alerta informativa";
      case "light":
        return "Esta es una alerta clara";
      case "dark":
        return "Esta es una alerta oscura";
      default:
        return "Esta es una alerta";
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {contextHolder}
      <div style={{ padding: "24px" }}>
        <Grid gutter={[24, 24]}>
          <Grid.Item xs={24} lg={8}>
            <Card>
              <div style={{ padding: "1rem" }}>
                <Title level={5}>Notificaciones</Title>
              </div>
              <div style={{ padding: "1rem" }}>
                <Button onClick={() => showNotification("success")}>Success</Button>
                <Button onClick={() => showNotification("info")}>Info</Button>
                <Button onClick={() => showNotification("warning")}>Warning</Button>
                <Button onClick={() => showNotification("error")}>Error</Button>
              </div>
            </Card>
          </Grid.Item>

          <Grid.Item xs={24} lg={16}>
            <Card>
              <div style={{ padding: "1rem" }}>
                <Title level={5}>Alertas</Title>
              </div>
              <div style={{ padding: "1rem" }}>
                <Alert message={alertContent("primary")} type="info" closable />
                <Alert
                  message={alertContent("secondary")}
                  type="default"
                  closable
                  style={{ marginTop: "0.5rem" }}
                />
                <Alert
                  message={alertContent("success")}
                  type="success"
                  closable
                  style={{ marginTop: "0.5rem" }}
                />
                <Alert
                  message={alertContent("error")}
                  type="error"
                  closable
                  style={{ marginTop: "0.5rem" }}
                />
                <Alert
                  message={alertContent("warning")}
                  type="warning"
                  closable
                  style={{ marginTop: "0.5rem" }}
                />
                <Alert
                  message={alertContent("info")}
                  type="info"
                  closable
                  style={{ marginTop: "0.5rem" }}
                />
                <Alert
                  message={alertContent("light")}
                  type="default"
                  closable
                  style={{ marginTop: "0.5rem" }}
                />
                <Alert
                  message={alertContent("dark")}
                  type="default"
                  closable
                  style={{ marginTop: "0.5rem" }}
                />
              </div>
            </Card>
          </Grid.Item>
        </Grid>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
