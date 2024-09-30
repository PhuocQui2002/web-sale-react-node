/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  WrapperLableText,
  WrapperTextValue,
  WrapperContent,
  WrapperTextPrice,
} from "./style";
import { Checkbox, Rate, Row } from "antd";

function NavbarComponent() {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        // eslint-disable-next-line no-unused-vars
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        // eslint-disable-next-line no-unused-vars
        return options.map((option) => {
          return (
            <div style={{ display: "flex", gap: "4px" }}>
              {" "}
              <Rate disabled defaultValue={option} />
              <span>Tu {option} s</span>
            </div>
          );
        });
      case "price":
        // eslint-disable-next-line no-unused-vars
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLableText>List</WrapperLableText>
      <WrapperContent>
        {renderContent("text", ["Động vật", "Phong cảnh", "Vũ trụ"])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "Dongvat", label: "Động vật" },
          { value: "PhongCanh", label: "Phong cảnh" },
          { value: "VuTru", label: "Vũ trụ" },
        ])}
      </WrapperContent>
      <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>
      <WrapperContent>
        {renderContent("price", ["duoi 400$", "duoi 500$"])}
      </WrapperContent>
    </div>
  );
}

export default NavbarComponent;
