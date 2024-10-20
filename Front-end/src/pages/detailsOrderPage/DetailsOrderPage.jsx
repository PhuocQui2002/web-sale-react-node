import React, { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import { convertPrice } from "../../utils";

const DetailsOrderPage = () => {
  const params = useParams();
  const { id } = params;
  console.log("params", params);
  const location = useLocation();
  const { state } = location;
  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    console.log("res-DetailsOrderPage", res);
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
  });
  const { isLoading, data } = queryOrder;
  console.log("data", data);
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.totalPrice * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
      <div style={{ width: "1270px", margin: "0 auto", height: "1270px" }}>
        <h4>Chi tiết đơn hàng</h4>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className="name-info">{data?.shippingAddress?.fullName}</div>
              <div className="address-info">
                <span>Địa chỉ: </span>{" "}
                {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
              </div>
              <div className="type-info">
                <span>Điện thoại: </span> {data?.shippingAddress?.phone}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className="delivery-info">
                <span className="name-delivery">FAST </span>Giao hàng tiết kiệm
              </div>
              <div className="delivery-fee">
                <span>Phí giao hàng: </span> {data?.shippingPrice}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className="payment-info">
                {orderContant.payment[data?.paymentMethod]}
              </div>
              <div className="status-payment">
                {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "600px" }}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Kích thước</WrapperItemLabel>
            <WrapperItemLabel>Khung</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <WrapperProduct>
                <WrapperNameProduct>
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
                      height: "70px",
                    }}
                  >
                    {order?.name}
                  </div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.totalPrice)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>

                <WrapperItem>{order?.frame}</WrapperItem>
                <WrapperItem>{order?.size}</WrapperItem>
                <WrapperItem>
                  {order?.discount
                    ? convertPrice((priceMemo * order?.discount) / 100)
                    : "0 VND"}
                </WrapperItem>
              </WrapperProduct>
            );
          })}

          <WrapperAllPrice>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem>
              <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
            </WrapperItem>
          </WrapperAllPrice>
        </WrapperStyleContent>
      </div>
    </div>
  );
};

export default DetailsOrderPage;
