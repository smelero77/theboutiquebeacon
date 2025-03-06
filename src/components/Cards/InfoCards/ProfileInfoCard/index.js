import { Card, Typography, Space, Button } from "antd";
import PropTypes from "prop-types";

const { Title, Text, Paragraph } = Typography;

function ProfileInfoCard({ title, description, info, social, action, shadow }) {
  return (
    <Card style={{ boxShadow: shadow ? "0 0 2rem 0 rgba(136, 152, 170, .15)" : "none" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={5} style={{ textTransform: "capitalize" }}>
            {title}
          </Title>
          <Paragraph>{description}</Paragraph>
        </div>

        <div>
          {Object.entries(info).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "0.5rem" }}>
              <Text strong style={{ textTransform: "capitalize" }}>
                {key}:
              </Text>{" "}
              <Text>{value}</Text>
            </div>
          ))}
        </div>

        {social && (
          <div>
            {social.map((item, index) => (
              <Button
                key={index}
                type="text"
                icon={item.icon}
                href={item.link}
                style={{ color: item.color, marginRight: "0.5rem" }}
              />
            ))}
          </div>
        )}

        {action && (
          <Button type="primary" href={action.route}>
            {action.label}
          </Button>
        )}
      </Space>
    </Card>
  );
}

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  shadow: PropTypes.bool,
};

ProfileInfoCard.defaultProps = {
  shadow: true,
};

export default ProfileInfoCard;
