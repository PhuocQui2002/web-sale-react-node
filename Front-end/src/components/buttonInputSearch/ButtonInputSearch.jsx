// eslint-disable-next-line no-unused-vars
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../inputComponent/InputComponent";
import ButtonCpmponent from "../buttonCpmponent/ButtonCpmponent";

const ButtonInputSearch = (props) => {
  const {
    // eslint-disable-next-line no-undef, react/prop-types
    size,
    // eslint-disable-next-line react/prop-types
    placeholder,
    // eslint-disable-next-line react/prop-types
    textButton,
    // eslint-disable-next-line react/prop-types
    backgroundInput = "#fff",
    // eslint-disable-next-line react/prop-types
    backgroundButton = "rgb(13,92,182)",
    // eslint-disable-next-line react/prop-types, no-unused-vars
    colorButton = "#fff",
    // eslint-disable-next-line react/prop-types
    bordered,
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        //bordered ={bordered}
        style={{ background: backgroundInput }}
      />
        <ButtonCpmponent
          size={size}
          bordered={bordered}
          icon={<SearchOutlined color={colorButton} />}
          styleButton={{ background: backgroundButton, border: !bordered && "none" }}
          textButton = {textButton}
          styleStextButton={{color : colorButton}}
        >
          
        </ButtonCpmponent>
    </div>
  );
};

export default ButtonInputSearch;
