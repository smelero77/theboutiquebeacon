import { useState } from "react";
import { Card, Row, Col, Typography, Button, Space } from "antd";
import { CreditCardOutlined, FileTextOutlined, HistoryOutlined } from "@ant-design/icons";

// Layout components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";

// Billing components
import PaymentMethod from "components/Billing/PaymentMethod";
import Invoices from "components/Billing/Invoices";
import BillingInformation from "components/Billing/BillingInformation";
import Transactions from "components/Billing/Transactions";

const { Title, Text } = Typography;

function Billing() {
  const [activeTab, setActiveTab] = useState("payment-method");
  const [currentPlan, setCurrentPlan] = useState("basic");

  const renderContent = () => {
    switch (activeTab) {
      case "payment-method":
        return <PaymentMethod />;
      case "invoices":
        return <Invoices />;
      case "billing-information":
        return <BillingInformation />;
      case "transactions":
        return <Transactions />;
      default:
        return <PaymentMethod />;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ padding: "2rem" }}>
        <Title level={2}>Facturación</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card title="Plan Básico">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Características básicas</Text>
                <Text>Hasta 5 usuarios</Text>
                <Text>10GB de almacenamiento</Text>
                <Text>Soporte por email</Text>
                <Button type="primary" block>
                  Seleccionar Plan
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Plan Pro">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Características avanzadas</Text>
                <Text>Hasta 20 usuarios</Text>
                <Text>50GB de almacenamiento</Text>
                <Text>Soporte prioritario</Text>
                <Button type="primary" block>
                  Seleccionar Plan
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Plan Enterprise">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Características empresariales</Text>
                <Text>Usuarios ilimitados</Text>
                <Text>Almacenamiento ilimitado</Text>
                <Text>Soporte 24/7</Text>
                <Button type="primary" block>
                  Seleccionar Plan
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card>
              <Title level={4}>Facturación</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  type={activeTab === "payment-method" ? "primary" : "default"}
                  icon={<CreditCardOutlined />}
                  block
                  onClick={() => setActiveTab("payment-method")}
                >
                  Método de Pago
                </Button>
                <Button
                  type={activeTab === "invoices" ? "primary" : "default"}
                  icon={<FileTextOutlined />}
                  block
                  onClick={() => setActiveTab("invoices")}
                >
                  Facturas
                </Button>
                <Button
                  type={activeTab === "billing-information" ? "primary" : "default"}
                  icon={<CreditCardOutlined />}
                  block
                  onClick={() => setActiveTab("billing-information")}
                >
                  Información de Facturación
                </Button>
                <Button
                  type={activeTab === "transactions" ? "primary" : "default"}
                  icon={<HistoryOutlined />}
                  block
                  onClick={() => setActiveTab("transactions")}
                >
                  Transacciones
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={16}>
            <Card>{renderContent()}</Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
