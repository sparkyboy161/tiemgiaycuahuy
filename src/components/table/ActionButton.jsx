import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function ActionButton(props) {
  const { onDelete, getCustomer, showModal } = props;

  const onEditClick = () => {
    showModal("edit");
    getCustomer();
  };

  return (
    <div>
      <DeleteOutlined onClick={onDelete} />
      <EditOutlined onClick={onEditClick} />
    </div>
  );
}

export default ActionButton;
