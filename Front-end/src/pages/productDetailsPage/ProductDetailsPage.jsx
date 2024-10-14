// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        // height: "1000px",
        background: "#efefef",
        padding: "0 120px",
        height: "735px",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          textAlign: "center",
          color: "#333",
          fontWeight: "bold",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          marginBottom: "5px",
          marginTop: "5px",
        }}
      >
        <span>Chi tiết sản phẩm</span>
      </div>
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
}

export default ProductDetailsPage;
