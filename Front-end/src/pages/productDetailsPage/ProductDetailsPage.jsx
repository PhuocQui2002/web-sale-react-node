// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "1000px",
        background: "#efefef",
        padding: "0 120px",
      }}
    >
      <h5>Chi tiết sản phẩm</h5>
      <ProductDetailsComponent  idProduct={id}/>
    </div>
  );
}

export default ProductDetailsPage;
