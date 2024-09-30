// eslint-disable-next-line no-unused-vars
import React from "react";
import { Input } from "antd";
// eslint-disable-next-line react/prop-types
function InputComponent({ size, style, placeholder, ...rests }) {
  return (  
      <Input
        size={size}
        placeholder={placeholder}
        //bordered ={bordered}
        style={style}
        {...rests}
      />
  );
}

export default InputComponent;
