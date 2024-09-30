// eslint-disable-next-line no-unused-vars
import React from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import CartComponent1 from "../../components/cartComponent/CartComponent";
import CartComponent2 from "../../components/cartComponent/CartComponent2";
import CartComponent3 from "../../components/cartComponent/CartComponent3";
import CartComponent4 from "../../components/cartComponent/CartComponent4";
import CartComponent5 from "../../components/cartComponent/CartComponent5";
import { Row } from "antd";
import { Pagination } from "antd";
import { WrapperProducts, WrapperNavbar } from "./styles";

function TypeProcduct() {
  const onShowSizeChange = () => {};
  return (
    <div style={{ width: "100%", background: "#efefef" }}>
      <div
        style={{
          width: "1270px",
          height: "1000px",
          margin: "0 auto",
        }}
      >
        <Row
          style={{
            padding: "0 120px",

            flexWrap: "nowrap",
            paddingTop: "10px",
          }}
        >
          <WrapperNavbar style={{ width: "350px" }}>
            <NavbarComponent />
          </WrapperNavbar>
          <WrapperProducts span={20}>
            <CartComponent1 />
            <CartComponent2 />
            <CartComponent3 />
            <CartComponent1 />
            <CartComponent2 />
            <CartComponent3 />
            <CartComponent4 />
            <CartComponent5 />
            <CartComponent3 />
            <CartComponent4 />
            <CartComponent5 />
          </WrapperProducts>
        </Row>
        <Pagination
          style={{
            justifyItems: "center",
            textAlign: "center",
            position: "sticky",
            bottom: "0px",
            left: "0",
            right: "0",
            marginTop: "5px",
          }}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={200}
        />
      </div>
    </div>
  );
}

export default TypeProcduct;
