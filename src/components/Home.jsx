import { Button, Input, Form, Typography } from "antd";
import { NavBar } from "antd-mobile";
import { navigate } from "@reach/router";
import React, { useState } from "react";
import firebase from "firebase/app";
import db from "../firebase";

const Home = () => {
  const [error, setError] = useState(false);
  const [form] = Form.useForm();
  const { Title } = Typography;
  const submit = async ({ tableNo }) => {
    if (tableNo && tableNo > 0) {
      setError(false);
      await db.collection("tables").doc(tableNo).set({
        tableNo,
        created: firebase.firestore.Timestamp.now(),
      });
      form.resetFields();
      navigate(`/actions/${tableNo}`);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <NavBar mode="light">
        <Title level={2}>Call Bell</Title>
      </NavBar>
      <Form form={form} onFinish={submit}>
        <div className="container center">
          <Form.Item
            name="tableNo"
            validateStatus={error ? "error" : "success"}
            help={error ? "please enter a valid table number" : ""}
          >
            <Input size="large" placeholder="Enter table number" />
          </Form.Item>
          <Button htmlType="submit" size="large" type="primary">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Home;
