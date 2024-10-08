// eslint-disable-next-line no-unused-vars
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../inputComponent/InputComponent";
import ButtonCpmponent from "../buttonCpmponent/ButtonCpmponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    backgroundInput = "#fff",
    backgroundButton = "rgb(13,92,182)",
    colorButton = "#fff",
    bordered,
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        //bordered ={bordered}
        style={{ background: backgroundInput }}
        {...props}
      />
      <ButtonCpmponent
        size={size}
        bordered={bordered}
        icon={<SearchOutlined color={colorButton} />}
        styleButton={{
          background: backgroundButton,
          border: !bordered && "none",
        }}
        textButton={textButton}
        styleStextButton={{ color: colorButton }}
      ></ButtonCpmponent>
    </div>
  );
};

export default ButtonInputSearch;
