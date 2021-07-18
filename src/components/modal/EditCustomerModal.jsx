import React, { useState, useRef } from "react";

import "./editCustomerModal.css";

import { Form, Modal, Button, Input } from "antd";
import Draggable from "react-draggable";

import { formItemLayout } from "../../json";

function EditCustomerModal(props) {
  const { visible, onEdit, handleCancel, loading, customer } = props;

  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef();

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };

  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          // end
        >
          Chỉnh sửa thông tin khách hàng
        </div>
      }
      onOk={() => onEdit(form.getFieldsValue())}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => onEdit(form.getFieldsValue())}
        >
          Xác nhận
        </Button>,
      ]}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
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
    </Modal>
  );
}

export default EditCustomerModal;
