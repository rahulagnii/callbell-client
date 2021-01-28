import React, { useState, useEffect } from "react";
import {Image, Button, Col, Row, Typography } from "antd";
import { useParams, navigate } from "@reach/router";
import firebase from "firebase/app";
import db from "../firebase";
import { Discount, Sugar, Waiter, Water } from "./icon";
import logo from "../bell.png"; 

const Actions = () => {
  const table = useParams();
  const { Title } = Typography;
  const [tableData, setTableData] = useState();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    db.collection("tables")
      .doc(table.id)
      .onSnapshot((docSnapshot) => {
        if (docSnapshot.exists) {
          setStatus(true);
        } else {
          setStatus(false);
          if (!status) {
            navigate("/");
          }
        }
      });
  }, [status]);

  db.collection("tables")
    .doc(table.id)
    .get()
    .then((doc) => setTableData(doc.data()));

  const setCallWaiter = () => {
    db.collection("notifications")
      .doc(`waiter${tableData.tableNo}`)
      .set({
        id: `waiter${tableData.tableNo}`,
        tableId: table.id,
        tableNo: tableData.tableNo,
        event: "Calling Waiter",
        created: firebase.firestore.Timestamp.now(),
      })
      .then(() => navigate("/success"));
  };

  const setGetBill = () => {
    db.collection("notifications")
      .doc(`bill${tableData.tableNo}`)
      .set({
        id: `bill${tableData.tableNo}`,
        tableId: table.id,
        tableNo: tableData.tableNo,
        event: "Asking Bill",
        created: firebase.firestore.Timestamp.now(),
      })
      .then(() => navigate("/success"));
  };

  const setNeedWater = () => {
    db.collection("notifications")
      .doc(`water${tableData.tableNo}`)
      .set({
        id: `water${tableData.tableNo}`,
        tableId: table.id,
        tableNo: tableData.tableNo,
        event: "Asking for Water",
        created: firebase.firestore.Timestamp.now(),
      })
      .then(() => navigate("/success"));
  };
  const setNeedSugar = () => {
    db.collection("notifications")
      .doc(`sugar${tableData.tableNo}`)
      .set({
        id: `sugar${tableData.tableNo}`,
        tableId: table.id,
        tableNo: tableData.tableNo,
        event: "Asking for Sugar",
        created: firebase.firestore.Timestamp.now(),
      })
      .then(() => navigate("/success"));
  };

  return (
    <div className="container center">
      <Image width={100} src={logo} style={{ marginTop:"30%" }} />
      <Title style={{ color: "white" }} level={2}>
        Call Bell
      </Title>
      <Row
        gutter={[16, 16]}
        style={{ marginTop: "20%" }}
        className="action-container"
      >
        <Col span={12}>
          <Button
            type="primary"
            onClick={setCallWaiter}
            size="large"
            className="full-btn"
          >
            <Waiter className="svg-icon" />
            <Col>Call Waiter</Col>
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={setGetBill}
            size="large"
            className="full-btn"
          >
            <Discount className="svg-icon" />
            <Col>Get Bill</Col>
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            className="full-btn"
            onClick={setNeedWater}
          >
            <Water className="svg-icon" />
            <Col>Need Water</Col>
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={setNeedSugar}
            size="large"
            className="full-btn"
          >
            <Sugar className="svg-icon" />
            <Col>Need Sugar</Col>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Actions;
