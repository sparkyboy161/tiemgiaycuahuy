import React, { useState, useEffect, useCallback } from "react";

import "./customer.css";

import { Layout, Row, Typography, Button, Col, message } from "antd";

import CustomerTable from "../components/table/CustomerTable";
import AddModal from "../components/modal/customer/AddModal";
import EditModal from "../components/modal/customer/EditModal";

import { CustomerRepo } from "../firebase/firestore/CustomerRepo";

const { Title } = Typography;

function Customer() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
  });
  const [customer, setCustomer] = useState([]);
  const [customers, setCustomers] = useState([]);

  const onShow = (name) => {
    if (name === "add") {
      setAddModalVisible(true);
    } else {
      setEditModalVisible(true);
    }
  };

  const onCancel = (name) => {
    if (name === "add") {
      setAddModalVisible(false);
    } else {
      setEditModalVisible(false);
    }
  };

  const onCreate = async (values) => {
    const key = "createCustomer";

    message.loading({ content: "Đợi tí nào...", key });
    setLoading(true);

    const res = await CustomerRepo.create(values);

    setLoading(false);
    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      message.success({ content: res.message, key, duration: 3 });
      setCustomers([...customers, { ...res.data }]);
      setAddModalVisible(false);
    }
  };

  const onDelete = async (customerID) => {
    const res = await CustomerRepo.remove(customerID);
    const key = "onDelete";

    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setCustomers((customers) =>
        customers.filter((customer) => customer.id !== customerID)
      );
    }
  };

  const onEdit = async (values) => {
    const key = "onEditCustomer";

    message.loading({ content: "Đợi tí nào...", key });
    setLoading(true);

    const res = await CustomerRepo.update(customer.id, values);

    setLoading(false);

    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      message.success({ content: res.message, key, duration: 3 });
      setCustomers(
        customers.map((item) =>
          item.id === customer.id
            ? {
                ...item,
                ...values,
              }
            : item
        )
      );
      setEditModalVisible(false);
    }
  };

  const onEditClick = (key) => {
    onShow("edit");
    getCustomer(key);
  };

  const getCustomer = useCallback(async (id) => {
    const res = await CustomerRepo.getOneById(id);
    const key = "getCustomer";

    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setCustomer(res.data);
    }
  }, []);

  const getCustomers = useCallback(async (pageNumber, pageSize) => {
    const res = await CustomerRepo.getAll(pageNumber, pageSize);
    const key = "getCustomers";

    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setCustomers(res.data);
    }
  }, []);

  const getTotal = async () => {
    const res = await CustomerRepo.getTotal();
    const key = "getTotalCustomer";

    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setTotal(res.data);
    }
  };

  const onPaginationChange = async (page, pageSize) => {
    setPagination({
      ...pagination,
      pageNumber: page,
      pageSize: pageSize,
    });
    getCustomers(page, pageSize);
  };

  const onShowSizeChange = async (page) => {
    setPagination({
      ...pagination,
      pageNumber: page,
    });
    getCustomers(page, pagination.pageSize);
  };

  useEffect(() => {
    getCustomers(pagination.pageNumber, pagination.pageSize);
    getTotal();
  }, [getCustomers, pagination.pageNumber, pagination.pageSize]);

  return (
    <Layout className="content">
      <Row justify="space-between">
        <Col>
          <Title>Khách hàng</Title>
        </Col>
        <Col className="btn__container">
          <Button type="primary" onClick={() => onShow("add")}>
            Thêm khách hàng
          </Button>
        </Col>
      </Row>

      <AddModal
        visible={addModalVisible}
        onCreate={onCreate}
        handleCancel={() => onCancel("add")}
        loading={loading}
      />

      <EditModal
        visible={editModalVisible}
        onEdit={onEdit}
        handleCancel={() => onCancel("edit")}
        loading={loading}
        customer={customer}
      />

      <CustomerTable
        onShow={onShow}
        loading={loading}
        pagination={pagination}
        customers={customers}
        onPaginationChange={onPaginationChange}
        total={total}
        onShowSizeChange={onShowSizeChange}
        onDelete={onDelete}
        onEditClick={onEditClick}
        onCancel={onCancel}
      />
    </Layout>
  );
}

export default Customer;
