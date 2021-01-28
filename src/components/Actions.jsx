import React, { useState, useEffect } from "react";
import { Button, Col, Row, notification, Typography } from "antd";
import { NavBar } from "antd-mobile";
import { useParams, navigate } from "@reach/router";
import firebase from "firebase/app";
import db from "../firebase";
import { Discount, Sugar, Waiter, Water } from "./icon";

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
      .then(() =>
        notification.success({
          message: "Someone will Assist you soon",
        })
      );
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
      .then(() =>
        notification.success({
          message: "Someone will Assist you soon",
        })
      );
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
      .then(() =>
        notification.success({
          message: "Someone will Assist you soon",
        })
      );
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
      .then(() =>
        notification.success({
          message: "Someone will Assist you soon",
        })
      );
  };
  return (
    <div className="container">
      <NavBar mode="light">
        <Title level={2}>Call Bell</Title>
      </NavBar>
      <Row gutter={[16, 16]} className="action-container">
        <Col span={12}>
          <Button
            icon={<Waiter className="svg-icon" />}
            type="primary"
            onClick={setCallWaiter}
            size="large"
            className="full-btn"
          >
            Call Waiter
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<Discount className="svg-icon" />}
            type="primary"
            onClick={setGetBill}
            size="large"
            className="full-btn"
          >
            Get Bill
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<Water className="svg-icon" />}
            type="primary"
            size="large"
            className="full-btn"
            onClick={setNeedWater}
          >
            Need Water
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<Sugar className="svg-icon" />}
            type="primary"
            onClick={setNeedSugar}
            size="large"
            className="full-btn"
          >
            Need Sugar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Actions;
