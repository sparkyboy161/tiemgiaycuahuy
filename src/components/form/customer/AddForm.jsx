import React, { useEffect } from "react";

import { Form, Input } from "antd";

import { formItemLayout } from "../../../json";

function AddForm(props) {
  const { form, loading } = props;

  useEffect(() => {
    form.resetFields();
  }, [loading, form]);

  return (
    <Form {...formItemLayout} form={form} name="addCustomer" scrollToFirstError>
      <Form.Item
        name="name"
        label="Tên khách hàng"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống tên khách hàng!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="fbURL"
        label="Địa chỉ facebook"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống địa chỉ facebook!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống địa chỉ!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống số điện thoại!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default AddForm;
