import React from "react";
import { Row, Col, Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./styles.css";

const StatCard = ({ title, value, percentage, prefix = "€" }) => {
  const formatPercentage = (value) => `${value}%`;

  return (
    <Card className="statistics-card">
      <div className="card-content">
        <div className="card-header">
          <h3>{title}</h3>
          <span className={`percentage ${percentage >= 0 ? "positive" : "negative"}`}>
            {percentage >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {formatPercentage(Math.abs(percentage))}
          </span>
        </div>
        <div className="card-value">
          {prefix}
          {value}
        </div>
      </div>
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  prefix: PropTypes.string,
};

StatCard.defaultProps = {
  prefix: "€",
};

function StatisticsCards({ data = {} }) {
  const {
    netSales = { value: 0, percentage: 0 },
    dailyAverage = { value: 0, percentage: 0 },
    orders = { value: 0, percentage: 0 },
  } = data;

  const formatEuro = (value) => `${value.toFixed(2)} €`;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="Net Sales"
          value={formatEuro(netSales.value)}
          percentage={netSales.percentage}
        />
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="Daily Average"
          value={formatEuro(dailyAverage.value)}
          percentage={dailyAverage.percentage}
        />
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="Orders"
          value={orders.value.toString()}
          percentage={orders.percentage}
          prefix=""
        />
      </Col>
    </Row>
  );
}

StatisticsCards.propTypes = {
  data: PropTypes.shape({
    netSales: PropTypes.shape({
      value: PropTypes.number,
      percentage: PropTypes.number,
    }),
    dailyAverage: PropTypes.shape({
      value: PropTypes.number,
      percentage: PropTypes.number,
    }),
    orders: PropTypes.shape({
      value: PropTypes.number,
      percentage: PropTypes.number,
    }),
  }),
};

StatisticsCards.defaultProps = {
  data: {
    netSales: { value: 0, percentage: 0 },
    dailyAverage: { value: 0, percentage: 0 },
    orders: { value: 0, percentage: 0 },
  },
};

export default StatisticsCards;
