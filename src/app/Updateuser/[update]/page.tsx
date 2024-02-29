"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { Card } from "antd";
import Link from "next/link";
import { message } from "antd";
import { IoMdClose } from "react-icons/io";
import { updateUser } from "@/lib/features/userSlice";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
const UserForm = lazy(() => import("../../../components/UserForm"));

const update = (params: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const usersData = useAppSelector((state) => state.userInfo.users);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userDetails, setuserDetails] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const filteredUserData = usersData.find(
      (item: any, index: any) => item.id == params.params.update
    );

    // check user infofound or not.
    if (filteredUserData !== undefined) {
      setuserDetails(filteredUserData);
    } else {
      // error message display
      message.success("User info not found, Please try again later.");

      // redirect to list page
      router.push("/");
    }

    //eslint-disable-next-line
  }, [params.params.update]);

  const onFinish = (values: any) => {
    // store filled data in to redux
    let userPayload = values;
    userPayload.id = params.params.update;
    dispatch(updateUser(userPayload));

    // success message display
    message.success("User info updated successfully.");

    // redirect to list page
    router.push("/");
  };

  return (
    userDetails.length !== 0 && (
      <Layout>
        <Card
          style={{ width: 600 }}
          title="Edit User"
          extra={
            <Link href="/">
              <IoMdClose />
            </Link>
          }
        >
          <Suspense fallback={"Loading..."}>
            <UserForm
              onFinish={onFinish}
              userInfo={userDetails}
              userId={params.update}
            />
          </Suspense>
        </Card>
      </Layout>
    )
  );
};

export default update;
