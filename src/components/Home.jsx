import {Image, Button, Input, Form, Typography, Card } from "antd";
import { navigate } from "@reach/router";
import React, { useState } from "react";
import firebase from "firebase/app";
import db from "../firebase";
import logo from "../bell.png";

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
    <div className="center">
      <Image
        width={100}
        src={logo}
        style={{ marginTop:"30%"}}
      />
      <Title style={{color:"white"}} level={2}>Call Bell</Title>
      <Card className="card" style={{ marginTop: "10%", paddingTop: "20px" }}>
        <Form form={form} onFinish={submit}>
          <div className="center">
            <Form.Item
              name="tableNo"
              validateStatus={error ? "error" : "success"}
              help={error ? "please enter a valid table number" : ""}
            >
              <Input
                style={{
                  height: "40px",
                  textAlign: "center",
                  fontSize: "18px",
                }}
                size="large"
                placeholder="Enter table number"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                style={{ width: "100%", height: "60px", borderRadius: "8px" }}
                type="primary"
              >
                Continue
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Home;
