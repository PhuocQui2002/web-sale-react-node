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
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

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
                  <span style={{ fontWeight: "bold" }}>
                    {orderContant.delivery[state?.shippingMethod] == "FAST" ? (
                      <div style={{ display: "flex" }}>
                        <p style={{ color: "#ea8500" }}>FAST</p>{" "}
                        <span style={{ marginLeft: "10px" }}>
                          {" "}
                          giao hàng nhanh kiệm
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <p style={{ color: "#ea8500" }}>GO_JEK</p>{" "}
                        <span style={{ marginLeft: "10px" }}>
                          {" "}
                          giao hàng tiết kiệm
                        </span>
                      </div>
                    )}
                  </span>{" "}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>
                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state.orders?.map((order) => {
                console.log("orders-success", order);
                return (
                  <WrapperItemOrder
                    key={order?.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "180px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <img
                        src={order.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <p>{order?.name}</p>
                    </div>
                    <p
                      style={{
                        width: "180px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Kích thước: {order?.size}
                    </p>
                    <p
                      style={{
                        width: "120px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Khung:{" "}
                      {order?.frame === "none" ? "Không khung" : order?.frame}
                    </p>
                    <p
                      style={{
                        width: "120px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Giá tiền: {convertPrice(order?.totalPrice)} 
                    </p>
                    <p
                      style={{
                        width: "80px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Số lượng: {order?.amount}
                    </p>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfo>
            <div style={{
              marginTop: "10px",
            }}>
               <MDBCard className="mb-4">
          <MDBCardBody>
            <p>
              <strong>Giá đơn hàng</strong>
            </p>
            <span style={{ fontSize: "16px", color: "red", marginRight: "20px" }}>
                Phí ship : {convertPrice(state?.diliveryPriceMemo)}
              </span>
              <span style={{ fontSize: "16px", color: "red" }}>
                Tổng tiền: {convertPrice(state?.totalPriceMemo)}
              </span>
          </MDBCardBody>
        </MDBCard>
             
            </div>
          </WrapperContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
