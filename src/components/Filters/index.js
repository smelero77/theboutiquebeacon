import React from "react";
import { Card, Form, Select, Button, Space } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

function Filters({ onFilter }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (onFilter) {
      onFilter(values);
    }
  };

  return (
    <Card title="Filtros">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="status" label="Estado">
          <Select placeholder="Seleccionar estado">
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
            <Option value="pending">Pendiente</Option>
          </Select>
        </Form.Item>
        <Form.Item name="type" label="Tipo">
          <Select placeholder="Seleccionar tipo">
            <Option value="retail">Minorista</Option>
            <Option value="wholesale">Mayorista</Option>
            <Option value="service">Servicio</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Aplicar Filtros
            </Button>
            <Button onClick={() => form.resetFields()}>Limpiar</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

Filters.propTypes = {
  onFilter: PropTypes.func,
};

export default Filters;
