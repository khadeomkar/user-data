"use client";
import { Suspense, lazy } from "react";
import { Card } from "antd";
import Layout from "../../components/Layout";

const ImageView = lazy(() => import("../../components/ImageView"));

const About = () => {
  return (
    <Layout>
      <Card style={{ width: 600 }} title="About">
        <Suspense fallback={<>Loading...</>}>
          <ImageView />
        </Suspense>
      </Card>
    </Layout>
  );
};

export default About;
