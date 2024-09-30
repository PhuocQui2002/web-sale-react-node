// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button } from "antd";

function ButtonCpmponent({
  // eslint-disable-next-line react/prop-types
  size,
  // eslint-disable-next-line react/prop-types
  styleButton,
  // eslint-disable-next-line react/prop-types
  styleStextButton,
  // eslint-disable-next-line react/prop-types
  textButton,
  // eslint-disable-next-line react/prop-types
  disabled,
  // eslint-disable-next-line no-unused-vars
  ...rests
}) {
  return (
    <Button
      style={{
        ...styleButton,
        // eslint-disable-next-line react/prop-types
        background: disabled ? "black" : styleButton.background,
      }}
      size={size}
      {...rests}
    >
      <span style={styleStextButton}>{textButton}</span>
    </Button>
  );
}

export default ButtonCpmponent;
