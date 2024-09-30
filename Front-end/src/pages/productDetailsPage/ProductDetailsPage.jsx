// eslint-disable-next-line no-unused-vars
import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

function ProductDetailsPage() {
  return (
    <div
      style={{
        height: "1000px",
        background: "#efefef",
        padding: "0 120px",
      }}
    >
      <h5>Chi tiết sản phẩm</h5>
      <ProductDetailsComponent />
    </div>
  );
}

export default ProductDetailsPage;
