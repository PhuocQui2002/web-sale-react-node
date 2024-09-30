import { Spin } from "antd";

// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const LoadingComponent = ({ children, isPending, deday = 1000 }) => {
    
  return (
    <Spin spinning = {isPending} delay={deday}>
      {children}
    </Spin>
  );
};

export default LoadingComponent;
