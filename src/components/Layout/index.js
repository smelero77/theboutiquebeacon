import React from "react";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  TableOutlined,
  CreditCardOutlined,
  BellOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

function MainLayout({ children }) {
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
      label: "Tablas",
    },
    {
      key: "/billing",
      icon: <CreditCardOutlined />,
      label: "Facturación",
    },
    {
      key: "/notifications",
      icon: <BellOutlined />,
      label: "Notificaciones",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Perfil",
    },
    {
      key: "/rtl",
      icon: <GlobalOutlined />,
      label: "RTL",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ height: "100%", borderRight: 0 }}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
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
