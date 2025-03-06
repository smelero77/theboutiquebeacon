import React from "react";
import { Layout, Card } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function AuthLayout() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Outlet />
        </Card>
      </Content>
    </Layout>
  );
}

export default AuthLayout;
