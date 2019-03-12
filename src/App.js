import React, { Component, Suspense, lazy } from "react";
import Layout from "./Layout";
import "./App.css";
const ToDo = lazy(() => import("./ToDo/"));

class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <ToDo />
        </Layout>
      </Suspense>
    );
  }
}

export default App;
