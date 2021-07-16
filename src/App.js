import React from 'react'

import { Layout, Breadcrumb } from 'antd';

import Sider from './components/sider/Sider';
import Content from './components/content/Content';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css'

const App = () => {
  return (
    <Layout className='app'>
      <Router>
        <Header />
        <Layout>
          <Sider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content />
            <Footer />
          </Layout>
        </Layout>
      </Router>
    </Layout >
  )
}

export default App
