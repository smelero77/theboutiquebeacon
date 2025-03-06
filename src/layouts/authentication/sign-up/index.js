import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

const { Title } = Typography;

function SignUp() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Llamar a la función RPC para verificar si el usuario ya existe
      const { data: userExists, error: rpcError } = await supabase.rpc("check_user_exists", {
        email_input: values.email,
      });

      if (rpcError) throw rpcError;

      if (userExists) {
        message.error("El correo electrónico ya está registrado. Intenta con otro.");
        return;
      }

      // Si el usuario no existe, proceder con el registro
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (error) throw error;

      message.success("Registro exitoso. Por favor verifica tu correo electrónico.");
      navigate("/authentication/sign-in");
    } catch (error) {
      message.error(error.message || "Ocurrió un error inesperado. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        Registro
      </Title>
      <Form form={form} name="sign-up" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su nombre completo",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nombre completo" size="large" />
        </Form.Item>

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
          <Input prefix={<MailOutlined />} placeholder="Correo electrónico" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su contraseña",
            },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Por favor confirme su contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Las contraseñas no coinciden"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirmar contraseña"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Registrarse
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          ¿Ya tienes una cuenta? <Link to="/authentication/sign-in">Inicia sesión</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
