import React from "react";
import { Card, Avatar, Space, Typography } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

function DefaultProjectCard({ image, label, title, description, action, authors }) {
  return (
    <Card cover={<img alt={title} src={image} style={{ height: "200px", objectFit: "cover" }} />}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text type="secondary">{label}</Text>
        <Title level={4}>{title}</Title>
        <Text type="secondary">{description}</Text>
        <Space wrap>
          {authors.map((author) => (
            <Avatar key={author.name} src={author.image} />
          ))}
        </Space>
        {action && (
          <a href={action.route} style={{ marginTop: "16px" }}>
            {action.label}
          </a>
        )}
      </Space>
    </Card>
  );
}

DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DefaultProjectCard;
