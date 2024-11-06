import React from "react";
import { useNavigate } from "react-router-dom";

import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperCardStyle,
} from "./style";
import { StarFilled } from "@ant-design/icons";
//import logo from "../../assets/images/logo.png";
import logo from "../../assets/images/logohinh.webp";
import { MDBIcon } from "mdb-react-ui-kit";

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
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: "230px" }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
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
        {price.toLocaleString()} VNĐ{" "}
        {discount > 0 ? (
          <WrapperDiscountText><MDBIcon fas icon="tag" /> {discount}%</WrapperDiscountText>
        ) : (
          <div></div>
        )}
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CartComponent;
