// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperCardStyle,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import cart1 from "../../assets/images/cart1.jpg";
function CartComponent() {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: "230px" }}
      //style={{ width: 200 }}
      cover={
        <img
          alt="example"
          src={cart1}
        />
      }
    >
      <img
        src={logo}
        style={{
          width: "60px",
          height: "14px",
          position: "absolute",
          top: -1,
          left: -1,
          borderTopLeftRadius: "10px",
        }}
      />
      <StyleNameProduct>Tranh biển</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>5.0</span>
          <StarFilled
            style={{ fontSize: "10px", color: "yellow" }}
          ></StarFilled>
        </span>
        <span>| Đã bán 100+</span>
      </WrapperReportText>
      <WrapperPriceText>
        {" "}
        Price: 200$ <WrapperDiscountText>Sale:50%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
}

export default CartComponent;
