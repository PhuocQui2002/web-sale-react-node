// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import ProductEvaluateComponent from "../../components/productEvaluateComponent/ProductEvaluateComponent";

function ProductDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log("idProduct", id);

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
      <ProductEvaluateComponent idProductEvaluate={id} />
    </div>
  );
}

export default ProductDetailsPage;
