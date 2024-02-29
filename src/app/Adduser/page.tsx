"use client";

import { Suspense, lazy } from "react";
import { Card } from "antd";
import Link from "next/link";
import { message } from "antd";
import { IoMdClose } from "react-icons/io";
import { addUsers } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
const UserForm = lazy(() => import("../../components/UserForm"));
import Layout from "../../components/Layout";

const AddUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    // store filled data in to redux
    dispatch(addUsers(values));

    // success message display
    message.success("User info added successfully.");

    // redirect to list page
    router.push("/");
  };

  return (
    <Layout>
      <Card
        style={{ width: 600 }}
        title="Add User"
        extra={
          <Link href="/">
            <IoMdClose />
          </Link>
        }
      >
        <Suspense fallback={"Loading..."}>
          <UserForm onFinish={onFinish} />
        </Suspense>
      </Card>
    </Layout>
  );
};

export default AddUser;
