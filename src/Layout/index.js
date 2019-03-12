import React from "react";
import { Layout } from "antd";

import "./layout.css";

const { Header, Footer } = Layout;

export default ({ children }) => (
  <Layout style={{ height: "100vh" }}>
    <Header>ToDo List</Header>
    {children}
    <Footer>By William Penagos</Footer>
  </Layout>
);
