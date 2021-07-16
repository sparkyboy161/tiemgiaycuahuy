import React from "react";

import "./customer.css";

import { Layout, Row, Typography, Button, Col } from "antd";
import CustomerTable from "../components/table/CustomerTable";

const { Title } = Typography;

function Customer() {
  return (
    <Layout className="content">
      <Row justify="space-between">
        <Col>
          <Title>Khách hàng</Title>
        </Col>
        <Col className="btn__container">
          <Button type="primary">Thêm khách hàng</Button>
        </Col>
      </Row>

      <CustomerTable />
    </Layout>
  );
}

export default Customer;
