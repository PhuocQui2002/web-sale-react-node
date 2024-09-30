/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
//import painting from "../../assets/images/logoDN.jpg";

const CartComponent = (props) => {
  const {
      countInStock,
      description,
      image,
      name,
      price,
      rating,
      type,
      discount,
      selled,
      id,
  } = props;
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: "230px" }}
      cover={<img alt="example" src={image} />}
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
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>5.0</span>
          <StarFilled
            style={{ fontSize: "10px", color: "yellow" }}
          ></StarFilled>
        </span>
        <span>| Đã bán {selled} </span>
      </WrapperReportText>
      <WrapperPriceText>
        {price} VNĐ <WrapperDiscountText>giảm { discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CartComponent;
