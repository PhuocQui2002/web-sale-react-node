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
  FormatText,
} from "./style";
import ButtonComponent from "../../components/buttonCpmponent/ButtonCpmponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/messageComponent/messageComponent";
import EvaluateComponents from "../../components/evaluateComponents/EvaluateComponents";
import { MDBIcon } from "mdb-react-ui-kit";
import { Image } from "antd";

const MyOrderPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchMyOrder = async () => {
    const res = await OrderService.getAllOrderByUserId(
      user?.id,
      user?.access_token
    );

    return res?.data;
  };

  useEffect(() => {
    fetchMyOrder(user?.id, user?.access_token);
  });

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
    const { id, token, orderItems } = data;
    //console.log("userId", data);
    const res = OrderService.cancelOrder(id, token, orderItems);
    return res;
  });

  const handleCanceOrder = (order) => {
    if (order.statusOrder) {
      message.error("Xóa thất bại vì đơn hàng đã được vận chuyển");
    } else {
      mutation.mutate(
        {
          id: order._id,
          token: user?.access_token,
          orderItems: order?.orderItems,
        },
        {
          onSuccess: () => {
            queryOrder.refetch();
          },
        }
      );
    }
  };
  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success("Xóa thành công");
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error();
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data, isDelivered) => {
    return data?.map((order) => {
      console.log("order-myorder", order);
      return (
        <WrapperHeaderItem key={order?._id}>
          <div
            style={{
              width: "700px",
              //height: "200px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Image
              src={order?.image}
              style={{
                width: "170px",
                height: "170px",
                objectFit: "cover",
                border: "1px solid rgb(238, 238, 238)",
                padding: "2px",
              }}
            />
            <div
              style={{
                width: 350,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginLeft: "10px",
                fontSize: "20px",
              }}
            >
              <FormatText>{order?.name}</FormatText>
              <div
                style={{
                  width: "400px",
                  display: "flex",
                  alignItems: "center",
                  //fontStyle: "italic",
                  gap: 4,
                }}
              >
                <FormatText>Kích thước: {order?.size}</FormatText>
              </div>
              <div
                style={{
                  width: "400px",
                  display: "flex",
                  alignItems: "center",
                  //fontStyle: "italic",
                  gap: 4,
                }}
              >
                <FormatText>
                  Khung: {order?.frame == "none" ? "Không khung" : order?.frame}
                </FormatText>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "62px",
              width: 110,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Số lượng {order?.amount}
          </div>
          {isDelivered ? (
            <div
              style={{
              marginTop: "62px",
                height: "48px",
                width: "200px",
                border: "none",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <EvaluateComponents idProduct={order?.product} idUser={user.id} />
            </div>
          ) : (
            <div></div>
          )}
          <FormatText
            style={{ fontSize: "20px", color: "#242424", marginLeft: "auto" ,marginTop: "62px", }}
          >
            Giá: {convertPrice(order?.totalPrice)}
          </FormatText>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <WrapperContainer>
      <div style={{ height: "100vh", width: "1270px", margin: "0 auto" }}>
        {/* <span>Đơn hàng của tôi</span> */}
        <WrapperListOrder>
          {data?.map((order) => {
            //console.log("odddd", order);
            return (
              <WrapperItemOrder key={order?._id}>
                <WrapperStatus>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      <MDBIcon fas icon="box-open" /> Trạng thái đơn hàng:{" "}
                    </span>
                    <span
                      style={{ color: "rgb(90, 32, 193)", fontWeight: "bold" }}
                    >{`${
                      order?.statusOrder
                        ? "Đã giao bên vận chuyển"
                        : "Đang soạn hàng"
                    }`}</span>
                  </div>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      <MDBIcon fas icon="truck" /> Giao hàng:{" "}
                    </span>
                    <span
                      style={{ color: "rgb(90, 32, 193)", fontWeight: "bold" }}
                    >{`${
                      order.isDelivered ? "Đã giao hàng" : "Chưa nhận hàng"
                    }`}</span>
                  </div>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      <MDBIcon fas icon="money-bill-alt" /> Thanh toán:{" "}
                    </span>
                    <span
                      style={{ color: "rgb(90, 32, 193)", fontWeight: "bold" }}
                    >{`${
                      order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                    }`}</span>
                  </div>
                </WrapperStatus>
                {renderProduct(order?.orderItems, order?.isDelivered)}
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
