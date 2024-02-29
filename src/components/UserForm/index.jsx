"use client";

import { useEffect } from "react";
import { Button, Form, Input } from "antd";

const UserForm = ({onFinish, userInfo=[], userId=0}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if(userInfo) { 
      form.setFieldsValue({
        userName: userInfo?.userName,
        userEmail: userInfo?.userEmail,
        userDetails: userInfo?.userDetails
      });
    }

    //eslint-disable-next-line
  }, [userInfo]);

  return (
    <Form
      layout="vertical"
      variant="filled"
      name="user-info"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="User Name"
        name="userName"
        rules={[{ required: true, message: "Please enter user name." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="User Email"
        name="userEmail"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Please enter email address.",
          },
          {
            type: "email",
            message: "Please enter valid email address.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="User Details"
        name="userDetails"
        rules={[{ required: true, message: "Please enter user details." }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {userId !== 0 ? "Update" : "Save"}
        </Button>
      </Form.Item>
    </Form>
  )
};

export default UserForm;
