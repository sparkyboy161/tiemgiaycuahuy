import React, { useEffect } from "react";

import { Form, Input } from "antd";

import { formItemLayout } from "../../../json";

function EditForm(props) {
  const { customer, form } = props;

  useEffect(() => {
    form.resetFields();
  }, [customer, form]);

  return (
    <Form
      initialValues={customer}
      {...formItemLayout}
      form={form}
      name="editCustomer"
      scrollToFirstError
    >
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

export default EditForm;
