import React from "react";

import "./content.css";

import { Layout } from "antd";

import Routes from "../../routes/Routes";

function Content() {
  return (
    <Layout.Content className="content">
      <Routes />
    </Layout.Content>
  );
}

export default Content;
