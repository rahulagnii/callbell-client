import React from "react";
import { Result, Button, Card } from "antd";
import { navigate } from "@reach/router";

const Success = () => {
  const closeTab = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <Card className="card" style={{ marginTop: "30%" }}>
        <Result
          status="success"
          title="Request Send Successfully!"
          subTitle="We will assist you in a minutes, please wait."
          extra={[
            <Button
              type="primary"
              size="large"
              style={{ width: "150px", borderRadius: "10px" }}
              onClick={closeTab}
            >
              Okay
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
};
export default Success;
