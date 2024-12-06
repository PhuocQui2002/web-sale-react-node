import React from "react";
import { Button } from "antd";

function ButtonCpmponent({
  size,
  styleButton,
  styleStextButton,
  textButton,
  disabled,
  ...rests
}) {
  return (
    <Button
      style={{
        ...styleButton,
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
