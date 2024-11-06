// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import ProductEvaluateComponent from "../../components/productEvaluateComponent/ProductEvaluateComponent";
import { MDBIcon } from "mdb-react-ui-kit";

function ProductDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log("idProduct", id);
  const onNavigateSHome = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        // height: "1000px",
        //background: "#efefef",
        padding: "0 120px",
        height: "100vh",
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
        }}
      >
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={onNavigateSHome}>
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

        <div style={{ color: "#666" }}>Chi tiết sản phẩm</div>
      </div>

      <ProductDetailsComponent idProduct={id} />
      <ProductEvaluateComponent idProductEvaluate={id} />
    </div>
  );
}

export default ProductDetailsPage;
