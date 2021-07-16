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

  const getCustomers = async () => {
    const res = await CustomerRepo.getCustomerList(1, 10);
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
    console.log("onPaginationChange");
    setPagination({
      ...pagination,
      pageNumber: page,
      pageSize: pageSize,
    });
    const res = await CustomerRepo.getCustomerList(page, pageSize);
    const key = "onPaginationChange";
    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      console.log("onPaginationChange cus: ", page, pageSize);
      setCustomers(res.data);
    }
  };

  const onShowSizeChange = async (page) => {
    console.log("onShowSizeChange");
    setPagination({
      ...pagination,
      pageNumber: page,
    });
    const res = await CustomerRepo.getCustomerList(
      pagination.pageNumber,
      pagination.pageSize
    );
    const key = "onShowSizeChange";
    if (res.status === "error") {
      message.error({ content: res.message, key, duration: 3 });
    } else {
      setCustomers(res.data);
    }
  };

  useEffect(() => {
    getCustomers();
    getTotalCustomers();
  }, []);

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
