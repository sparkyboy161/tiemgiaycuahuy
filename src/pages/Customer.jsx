import React, { useState, useEffect } from "react";

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

  const handleOk = async (values) => {
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
      setAddModalVisible(false);
    }
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  const getCustomers = async (pageNumber, pageSize) => {
    const res = await CustomerRepo.getCustomerList(pageNumber, pageSize);
    const key = "getCustomers";
    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setCustomers(res.data);
    }
  };

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

  useEffect(() => {
    getCustomers(pagination.pageNumber, pagination.pageSize);
    getTotalCustomers();
  }, [loading, pagination.pageNumber, pagination.pageSize]);

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
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={loading}
      />
      <CustomerTable
        pagination={pagination}
        customers={customers}
        onPaginationChange={onPaginationChange}
        total={total}
        onShowSizeChange={onShowSizeChange}
      />
    </Layout>
  );
}

export default Customer;
