import React, { useState, useRef } from "react";

import "./addModal.css";

import { Form, Modal, Button } from "antd";
import Draggable from "react-draggable";

import AddCustomerForm from "../../form/customer/AddForm";

function AddModal(props) {
  const { visible, onCreate, handleCancel, loading } = props;

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
          Thêm khách hàng
        </div>
      }
      onOk={() => onCreate(form.getFieldsValue())}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => onCreate(form.getFieldsValue())}
        >
          Submit
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
      <AddCustomerForm form={form} loading={loading} />
    </Modal>
  );
}

export default AddModal;
