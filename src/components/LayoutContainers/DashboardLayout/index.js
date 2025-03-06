import { Layout } from "antd";
import PropTypes from "prop-types";

const { Content } = Layout;

function DashboardLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px", background: "#f0f2f5" }}>{children}</Content>
    </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
