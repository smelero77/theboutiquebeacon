import React, { useState } from "react";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TableOutlined,
  CreditCardOutlined,
  BellOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/tables",
      icon: <TableOutlined />,
      label: "Tables",
    },
    {
      key: "/billing",
      icon: <CreditCardOutlined />,
      label: "Billing",
    },
    {
      key: "/notifications",
      icon: <BellOutlined />,
      label: "Notifications",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "/rtl",
      icon: <GlobalOutlined />,
      label: "RTL",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)" }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: "18px", padding: "0 24px", cursor: "pointer" },
          })}
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
