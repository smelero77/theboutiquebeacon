import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";

const { Title } = Typography;

function BillingInformation() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Title level={4}>Billing Information</Title>
      <Form form={form} name="billing_information" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Please input your company name!" }]}
        >
          <Input placeholder="Your Company Name" />
        </Form.Item>

        <Form.Item
          label="VAT Number"
          name="vatNumber"
          rules={[{ required: true, message: "Please input your VAT number!" }]}
        >
          <Input placeholder="VAT Number" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea rows={3} placeholder="Your Address" />
        </Form.Item>

        <Space>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[{ required: true, message: "Please input your postal code!" }]}
          >
            <Input placeholder="Postal Code" />
          </Form.Item>
        </Space>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please input your country!" }]}
        >
          <Input placeholder="Country" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Billing Information
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BillingInformation;
