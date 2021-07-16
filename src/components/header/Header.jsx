import React from "react";

import "./header.css";

import { Layout } from "antd";

import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Layout.Header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="company logo" />
      </Link>
    </Layout.Header>
  );
}

export default Header;
