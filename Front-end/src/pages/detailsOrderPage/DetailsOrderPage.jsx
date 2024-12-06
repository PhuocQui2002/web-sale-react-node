import React, { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { MDBIcon } from "mdb-react-ui-kit";
import { Image } from "antd";

const DetailsOrderPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
  });

  const { isLoading, data } = queryOrder;

  const priceMemo = useMemo(() => {
    return data?.orderItems?.reduce(
      (total, cur) => total + cur.totalPrice * cur.amount,
      0
    );
  }, [data]);

  const priceDiscountMemo = useMemo(() => {
    return (
      data?.orderItems?.reduce((total, cur) => {
        const totalDiscount = cur.discount ? cur.discount : 0;
        return total + (cur.totalPrice * totalDiscount * cur.amount) / 100;
      }, 0) || 0
    );
  }, [data]);
  const onNavigateSHome = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f9f9fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          height: "40px",
          backgroundColor: "#E0EAF4", // Màu nền nhẹ nhàng hơn cho breadcrumb
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          fontSize: "14px",
          color: "#333",
          marginBottom: "10px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={onNavigateSHome}
        >
          <MDBIcon
            fas
            icon="home"
            style={{
              width: "14px",
              marginRight: "8px",
              color: "#007bff",
            }}
          />
          <span style={{ marginRight: "8px" }}>Trang chủ</span>
          <MDBIcon
            fas
            icon="angle-right"
            style={{
              width: "10px",
              color: "#999",
              marginRight: "8px",
            }}
          />
        </div>

        <div style={{ color: "#666" }}>Chi tiết đơn hàng</div>
      </div>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
            gap: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "20px",
              background: "#f5f5f7",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h5
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#666",
              }}
            >
              Địa chỉ người nhận
            </h5>
            <p style={{ fontSize: "14px" }}>
              <strong>Tên khách hàng: </strong>{" "}
              {data?.shippingAddress?.fullName}
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              <strong>Địa chỉ:</strong> {data?.shippingAddress?.address}
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              <strong>Điện thoại:</strong> {data?.shippingAddress?.phone}
            </p>
          </div>

          <div
            style={{
              flex: 1,
              padding: "20px",
              background: "#f5f5f7",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h5
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#666",
              }}
            >
              Hình thức giao hàng
            </h5>
            <p
              style={{ fontSize: "14px", fontWeight: "600", color: "#ff8c00" }}
            >
              {orderContant.delivery[data?.shippingMethod] === "FAST"
                ? "FAST giao hàng nhanh"
                : "GO_JEK giao hàng tiết kiệm"}
            </p>
            <p style={{ fontSize: "14px", color: "#333" }}>
              Phí giao hàng: {convertPrice(data?.shippingPrice)}
            </p>
          </div>

          <div
            style={{
              flex: 1,
              padding: "20px",
              background: "#f5f5f7",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h5
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#666",
              }}
            >
              Hình thức thanh toán
            </h5>
            <p
              style={{ fontSize: "14px", fontWeight: "600", color: "#ff8c00" }}
            >
              {orderContant.payment[data?.paymentMethod]}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: data?.isPaid ? "green" : "red",
              }}
            >
              {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
            </p>
          </div>
        </div>

        {/* Bảng sản phẩm */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Sản phẩm</th>
              <th style={{ padding: "10px" }}>Giá</th>
              <th style={{ padding: "10px" }}>Số lượng</th>
              <th style={{ padding: "10px" }}>Kích thước</th>
              <th style={{ padding: "10px" }}>Khung</th>
              <th style={{ padding: "10px" }}>Giảm giá</th>
            </tr>
          </thead>
          <tbody>
            {data?.orderItems?.map((order, index) => (
              <tr
                key={index}
                style={{
                  background: "#fafafa",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={order?.image}
                    alt="Product"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "15px",
                    }}
                  />
                  <span>{order?.name}</span>
                </td>
                <td style={{ padding: "10px" }}>
                  {convertPrice(order?.totalPrice)}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {order?.amount}
                </td>
                <td style={{ padding: "10px" }}>{order?.size}</td>
                <td style={{ padding: "10px" }}>
                  {order?.frame === "none" ? "Không khung" : order?.frame}
                </td>
                <td
                  style={{
                    padding: "10px",
                    color: order?.discount ? "red" : "black",
                  }}
                >
                  {order?.discount
                    ? convertPrice((order?.discount / 100) * order?.totalPrice)
                    : "0 VND"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tóm tắt giá */}
        <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "500" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Tạm tính</span>
            <span>{convertPrice(priceMemo)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Phí vận chuyển</span>
            <span>{convertPrice(data?.shippingPrice)}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <span>Tổng tiền đơn hàng</span>
            <span>{convertPrice(data?.totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsOrderPage;
