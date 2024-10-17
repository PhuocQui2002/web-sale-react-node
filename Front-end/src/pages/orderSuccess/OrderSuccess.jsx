import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";

import { useLocation } from "react-router-dom";
import {
  WrapperItemOrder,
  WrapperItemOrderInfo,
  WrapperContainer,
  Lable,
  WrapperInfo,
  WrapperValue,
} from "./style.js";

import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  //   const { delivery, payment, orders, totalPriceMemo } = location.state;
  //   console.log("state:", location.state);
  //   console.log("Delivery:", location.state?.delivery);
  //   console.log("Payment:", location.state?.payment);
  //   console.log("Orders:", location.state?.orders);
  //   console.log("Total Price:", location.state?.totalPriceMemo);

  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Đơn hàng đặt thành công</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderContant.delivery[state?.delivery]}
                  </span>{" "}
                  Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.name}>
                    <div
                      style={{
                        width: "400px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <img
                        src={order.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "40px",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          Giá tiền: {convertPrice(order?.price)}
                        </span>
                      </span>
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          Số lượng: {order?.amount}
                        </span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfo>
            <div>
            
            <span style={{ fontSize: "16px", color: "red" }}>
                Phí ship : {convertPrice(state?.diliveryPriceMemo)}
              </span>
              <span style={{ fontSize: "16px", color: "red" }}>
                Tổng tiền: {convertPrice(state?.totalPriceMemo)}
              </span>
            </div>
          </WrapperContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;