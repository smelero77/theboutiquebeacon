import React from "react";
import { Card, Form, Input, Button, Typography, Space } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function PaymentMethod() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Title level={4}>Payment Method</Title>
      <Form form={form} name="payment_method" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[{ required: true, message: "Please input your card number!" }]}
        >
          <Input prefix={<CreditCardOutlined />} placeholder="1234 5678 9012 3456" />
        </Form.Item>

        <Space>
          <Form.Item
            label="Expiry Date"
            name="expiryDate"
            rules={[{ required: true, message: "Please input expiry date!" }]}
          >
            <Input placeholder="MM/YY" />
          </Form.Item>

          <Form.Item
            label="CVV"
            name="cvv"
            rules={[{ required: true, message: "Please input CVV!" }]}
          >
            <Input placeholder="123" />
          </Form.Item>
        </Space>

        <Form.Item
          label="Card Holder Name"
          name="cardHolderName"
          rules={[{ required: true, message: "Please input card holder name!" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Payment Method
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PaymentMethod;
