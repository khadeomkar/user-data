import { Suspense, lazy } from "react";
import { Card } from "antd";
import Link from "next/link";
import Layout from "../components/Layout";

const UserList = lazy(() => import("../components/UserList/"));

export default function Home() {
  return (
    <Layout>
      <Card
        style={{ width: 600 }}
        title="User List"
        extra={<Link href="/Adduser">Add User</Link>}
      >
        <Suspense fallback={<>Loading...</>}>
          <UserList />
        </Suspense>
      </Card>
    </Layout>
  );
}
