import React from "react";
import { Layout, Card } from "antd";
import PropTypes from "prop-types";

const { Content } = Layout;

function AuthLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: 400 }}>{children}</Card>
      </Content>
    </Layout>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
