import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

function StatisticsCards() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic
            title="Ventas Totales"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic
            title="Pedidos"
            value={93}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic
            title="Clientes Activos"
            value={1128}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default StatisticsCards;
