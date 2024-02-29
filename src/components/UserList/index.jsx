"use client";

import { List, Modal, message } from "antd";
import Link from "next/link";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { removeUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";

const UserList = () => {
  const store = useAppStore();
  const dispatch = useDispatch();
  const usersData = useAppSelector((state) => state.userInfo.users);

  const deleteUser = async (userId) => {
    dispatch(removeUser(userId));

    // success message display
    message.success("User deleted successfully.");
  };

  const deleteConfirmation = async (item) => {
    Modal.confirm({
      title: "Delete User",
      content: (
        <span>
          Are you sure you want to delete <b>{item.userName}</b> user?
        </span>
      ),
      okText: "Yes",
      cancelText: "No",
      onOk() {
        deleteUser(item.id);
      },
    });
  };

  return usersData && usersData.length > 0 ? (
    <List
      bordered
      dataSource={usersData}
      renderItem={(item, key) => (
        <List.Item
          key={key}
          actions={[
            <Link key={key} href={"/Updateuser/" + item.id}>
              Edit
            </Link>,
            <div key={key} onClick={() => deleteConfirmation(item)}>
              Delete
            </div>,
          ]}
        >
          <List.Item.Meta
            title={item.userName + " (" + item.userEmail + ")"}
            description={item.userDetails}
          />
        </List.Item>
      )}
    />
  ) : (
    "no data found."
  );
};

export default UserList;
