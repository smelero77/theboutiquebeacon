import { Layout, Button } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Header } = Layout;

function DashboardNavbar({ onMenuClick }) {
  return (
    <Header
      style={{ background: "#fff", padding: "0 24px", display: "flex", alignItems: "center" }}
    >
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={onMenuClick}
        style={{ marginRight: "24px" }}
      />
      <div style={{ flex: 1 }} />
      <Button type="text" icon={<UserOutlined />}>
        Usuario
      </Button>
    </Header>
  );
}

DashboardNavbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default DashboardNavbar;
