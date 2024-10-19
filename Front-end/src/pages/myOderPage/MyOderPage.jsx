import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/buttonCpmponent/ButtonCpmponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/messageComponent/messageComponent";

const MyOrderPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await OrderService.getAllOrderByUserId(
      user?.id,
      user?.access_token
    );
    // console.log("res-oder: " + res);
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrder,
  });
  const { isLoading, data } = queryOrder;
  //   console.log("data-queryOrder", data);
  const handleDetailsOrder = (id) => {
    navigate(`/getDetailsOrder/${id}`, { token: user?.access_token });
  };

  const mutation = useMutationHooks((data) => {
    const { id, token,  orderItems} = data;
    const res = OrderService.cancelOrder(id, token , orderItems);
    return res;
  });

  const handleCanceOrder = (order) => {
    //console.log("user cancel order", user?.access_token)
    mutation.mutate(
      {
        id: order._id,
        token: user?.access_token,
        orderItems: order?.orderItems,
        //: user.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success();
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error();
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      console.log("order-myorder", order);
      return (
        <WrapperHeaderItem key={order?._id}>
          <div
            style={{
              width: "300px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <img
              src={order?.image}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                border: "1px solid rgb(238, 238, 238)",
                padding: "2px",
              }}
            />
            <div
              style={{
                width: 260,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginLeft: "10px",
              }}
            >
              {order?.name}
            </div>
          </div>
          <div
            style={{
              width: "400px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <p
              style={{ marginRight: "20px", fontSize: "15px", width: "280px" }}
            >
              Kích thước: {order?.size}
            </p>
            <div
              style={{
                width: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Khung: {order?.frame == "none" ? "Không khung" : order?.frame}
            </div>
          </div>
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            Số lượng {order?.amount}
          </div>

          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            Giá: {convertPrice(order?.totalPrice)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <WrapperContainer>
      <div style={{ height: "100vh", width: "1270px", margin: "0 auto" }}>
        <span>Đơn hàng của tôi</span>
        <WrapperListOrder>
          {data?.map((order) => {
            console.log("odddd", order);
            return (
              <WrapperItemOrder key={order?._id}>
                <WrapperStatus>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Trạng thái
                  </span>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Giao hàng:{" "}
                    </span>
                    <span
                      style={{ color: "rgb(90, 32, 193)", fontWeight: "bold" }}
                    >{`${
                      order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                    }`}</span>
                  </div>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Thanh toán:{" "}
                    </span>
                    <span
                      style={{ color: "rgb(90, 32, 193)", fontWeight: "bold" }}
                    >{`${
                      order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                    }`}</span>
                  </div>
                </WrapperStatus>
                {renderProduct(order?.orderItems)}
                <WrapperFooterItem>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Tổng tiền:{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgb(56, 56, 61)",
                        fontWeight: 700,
                      }}
                    >
                      {convertPrice(order?.totalPrice)}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <ButtonComponent
                      onClick={() => handleCanceOrder(order)}
                      size={40}
                      styleButton={{
                        height: "36px",
                        border: "1px solid #9255FD",
                        borderRadius: "4px",
                      }}
                      textButton={"Hủy đơn hàng"}
                      styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                    ></ButtonComponent>
                    <ButtonComponent
                      onClick={() => handleDetailsOrder(order?._id)}
                      size={40}
                      styleButton={{
                        height: "36px",
                        border: "1px solid #9255FD",
                        borderRadius: "4px",
                      }}
                      textButton={"Xem chi tiết"}
                      styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                    ></ButtonComponent>
                  </div>
                </WrapperFooterItem>
              </WrapperItemOrder>
            );
          })}
        </WrapperListOrder>
      </div>
    </WrapperContainer>
  );
};

export default MyOrderPage;
