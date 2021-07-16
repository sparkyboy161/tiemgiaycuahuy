import React, { useState } from "react";

import "./sider.css";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

function Sider() {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const redirectTo = (url) => {
    history.push(url);
  };

  return (
    <Layout.Sider
      className="sider"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item
          key="1"
          icon={<UserOutlined />}
          onClick={() => redirectTo("customer")}
        >
          Customer
        </Menu.Item>

        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Sider>
  );
}

export default Sider;
