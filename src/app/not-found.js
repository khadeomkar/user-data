"use client";

import { Card } from "antd";
import Layout from "../components/Layout";
import React from "react";

const notFound = () => {
  return (
    <Layout>
      <Card style={{ width: 600 }}>
        <h3>404 | Page not found</h3>
      </Card>
    </Layout>
  );
};

export default notFound;
