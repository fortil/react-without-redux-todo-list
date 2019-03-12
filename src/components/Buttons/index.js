import React, { useState } from "react";
import { Col, Button } from "antd";

export default function ButtonsGroup({ buttons, show }) {
  const [primary, setPrimary] = useState("All");

  return (
    <React.Fragment>
      {buttons.map(({ name }) => (
        <Col key={name} span={8}>
          <Button
            block
            type={name === primary ? "primary" : "secondary"}
            onClick={() => {
              show(name);
              setPrimary(name);
            }}
          >
            {name}
          </Button>
        </Col>
      ))}
    </React.Fragment>
  );
}
