import React, { useState, useEffect, useCallback } from "react";

import "./customer.css";

import { Layout, Row, Typography, Button, Col, message } from "antd";

import CustomerTable from "../components/table/CustomerTable";
import AddCustomerModal from "../components/modal/AddCustomerModal";

import { CustomerRepo } from "../firebase/firestore/CustomerRepo";

const { Title } = Typography;

function Customer() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
  });
  const [customers, setCustomers] = useState([]);

  const showModal = () => {
    setAddModalVisible(true);
  };

  const handleCreateCustomer = async (values) => {
    const key = "createCustomer";

    message.loading({ content: "Đợi tí nào...", key });
    setLoading(true);
    console.log("values: ", values);
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

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  const getCustomers = useCallback(async (pageNumber, pageSize) => {
    const res = await CustomerRepo.getCustomerList(pageNumber, pageSize);
    const key = "getCustomers";

    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setCustomers(res.data);
    }
  }, []);

  const getTotalCustomers = async () => {
    const res = await CustomerRepo.getTotalCustomers();
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

  const onDeleteCustomer = async (customerID) => {
    const res = await CustomerRepo.remove(customerID);
    const key = "onDeleteCustomer";

    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setCustomers((customers) =>
        customers.filter((customer) => customer.id !== customerID)
      );
    }
  };

  useEffect(() => {
    getCustomers(pagination.pageNumber, pagination.pageSize);
    getTotalCustomers();
  }, [getCustomers, pagination.pageNumber, pagination.pageSize]);

  return (
    <Layout className="content">
      <Row justify="space-between">
        <Col>
          <Title>Khách hàng</Title>
        </Col>
        <Col className="btn__container">
          <Button type="primary" onClick={showModal}>
            Thêm khách hàng
          </Button>
        </Col>
      </Row>

      <AddCustomerModal
        visible={addModalVisible}
        handleOk={handleCreateCustomer}
        handleCancel={handleCancel}
        loading={loading}
      />
      <CustomerTable
        loading={loading}
        pagination={pagination}
        customers={customers}
        onPaginationChange={onPaginationChange}
        total={total}
        onShowSizeChange={onShowSizeChange}
        onDeleteCustomer={onDeleteCustomer}
      />
    </Layout>
  );
}

export default Customer;
