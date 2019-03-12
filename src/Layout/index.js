import React from 'react';
import { Layout } from "antd";
const { Header, Footer } = Layout;

export default ({ children }) => (
  <Layout style={{ height: "100vh" }}>
    <Header>TODO List</Header>
    {children}
    <Footer>By William Penagos</Footer>
  </Layout>
);
