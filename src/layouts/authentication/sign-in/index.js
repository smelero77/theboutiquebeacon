import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

const { Title } = Typography;

function SignIn() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      message.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        Iniciar Sesión
      </Title>
      <Form form={form} name="sign-in" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su correo electrónico",
            },
            {
              type: "email",
              message: "Por favor ingrese un correo electrónico válido",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Correo electrónico" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su contraseña",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Iniciar Sesión
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          ¿No tienes una cuenta? <Link to="/authentication/sign-up">Regístrate</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
