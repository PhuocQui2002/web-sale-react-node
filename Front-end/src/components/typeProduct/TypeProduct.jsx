import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonCpmponent from "../buttonCpmponent/ButtonCpmponent";
import { Select } from "antd";

function TypeProduct({ name }) {
  const navigate = useNavigate();
  const handleNavigatetype = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };
  return (
    <>
      <ButtonCpmponent
        styleButton={{
          padding: "0 10px",
          cursor: "pointer",
          color: "black",
          fontSize: "14px",
        }}
        onClick={() => handleNavigatetype(name)}
        textButton={name}
      />
      {/* <Select
      defaultValue={name}
      style={{ width: 120 }}
      //disabled
      options={[{ value: {name}, label: {name} }]}
    /> */}
    </>
  );
}

export default TypeProduct;
