import React from "react";
import { Card, Typography, Space, Avatar } from "antd";
import PropTypes from "prop-types";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ProfileInfoCard({ title, description, info, social, action }) {
  const renderSocialLinks = () => {
    return social.map((item) => {
      let icon;
      switch (item.platform) {
        case "facebook":
          icon = <FacebookOutlined />;
          break;
        case "twitter":
          icon = <TwitterOutlined />;
          break;
        case "instagram":
          icon = <InstagramOutlined />;
          break;
        default:
          icon = null;
      }
      return (
        <a key={item.platform} href={item.link} target="_blank" rel="noopener noreferrer">
          <Avatar icon={icon} style={{ backgroundColor: item.color }} />
        </a>
      );
    });
  };

  return (
    <Card>
      <Title level={4}>{title}</Title>
      <Text type="secondary">{description}</Text>
      <Space direction="vertical" style={{ width: "100%", marginTop: "24px" }}>
        <div>
          <Text strong>Nombre completo:</Text>
          <Text style={{ marginLeft: "8px" }}>{info.fullName}</Text>
        </div>
        <div>
          <Text strong>Móvil:</Text>
          <Text style={{ marginLeft: "8px" }}>{info.mobile}</Text>
        </div>
        <div>
          <Text strong>Email:</Text>
          <Text style={{ marginLeft: "8px" }}>{info.email}</Text>
        </div>
        <div>
          <Text strong>Ubicación:</Text>
          <Text style={{ marginLeft: "8px" }}>{info.location}</Text>
        </div>
      </Space>
      <Space style={{ marginTop: "24px" }}>{renderSocialLinks()}</Space>
    </Card>
  );
}

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
