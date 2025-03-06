import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      Material Dashboard React ©{new Date().getFullYear()} Creado con Ant Design
    </AntFooter>
  );
}

export default Footer;
