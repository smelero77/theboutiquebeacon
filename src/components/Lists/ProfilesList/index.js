import React from "react";
import { Card, List, Avatar, Typography } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

function ProfilesList({ title, profiles }) {
  return (
    <Card>
      <Title level={4}>{title}</Title>
      <List
        itemLayout="horizontal"
        dataSource={profiles}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={item.name}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProfilesList;
