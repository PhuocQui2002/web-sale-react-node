import React, { useEffect, useState } from "react";
import { Col, Row, Image, Rate } from "antd";
import img from "../../assets/images/logoDN.jpg";

import { StarFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
} from "./style";
import ButtonCpmponent from "../buttonCpmponent/ButtonCpmponent";
import LoadingComponent from "../loadingComponent/loadingComponent";
import { addOrderProduct } from "../../redux/slides/orderSlide";

const ProductDetailsComponent = ({ idProduct }) => {
  // useEffect(() => {
  //   fetchGetDetailsProduct();
  // }, []);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [numProduct, setNumProduct] = useState(0);
  const onChangeInput = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
    throw new Error("Invalid Product ID"); // Ném lỗi nếu không có ID
  };
  const {
    isLoading,
    isError,
    data: productDetails,
  } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct, // Chỉ thực hiện truy vấn khi idProduct có giá trị
  });

  console.log("productDetails", productDetails);
  console.log("user", user);

  const handleChangeCount = (type) => {
    console.log("type", type);
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };
  console.log("numProduct:", numProduct);
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/login", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };

  return (
    <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "5px" }}
      >
        <Image src={productDetails?.image} alt="img product" preview={true} />
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperStyleNameProduct>
          {productDetails?.name}
        </WrapperStyleNameProduct>
        <div>
          <Rate
            allowHalf
            defaultValue={productDetails?.rating}
            value={productDetails?.rating}
          />

          <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
        </div>

        <div>{productDetails?.description}</div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            {productDetails?.price.toLocaleString()} VNĐ
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">{user?.address}</span>-
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div
          style={{
            margin: "10px 0 20px",
            padding: "10px 0",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div style={{ marginTop: "6px", marginBottom: "6px" }}>
            Số lượng trong kho {productDetails?.countInStock}{" "}
          </div>
          <WrapperQualityProduct>
            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleChangeCount("decrease")}
            >
              <MinusOutlined
                style={{
                  color: "#000",
                  fontSize: "20px",
                }}
              />
            </button>
            <WrapperInputNumber
              defaultValue={1}
              onChange={onChangeInput}
              value={numProduct}
              size="small"
            />
            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleChangeCount("increase")}
            >
              <PlusOutlined
                style={{
                  color: "#000",
                  fontSize: "20px",
                }}
              />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ButtonCpmponent
            //bodered={false}
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "220px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            textButton={"Mua ngay"}
            styleStextButton={{
              color: "#fff",
              fontSize: "15px",
              fontweight: "700",
            }}
            onClick={handleAddOrderProduct}
          />
          <ButtonCpmponent
            //bodered={false}
            //onClick={() => addToCart(product)}
            size={40}
            styleButton={{
              background: "#fff",
              height: "48px",
              width: "220px",
              border: "1px solid rgb(13,92,182)",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            textButton={"Thêm giỏ hàng"}
            styleStextButton={{
              color: "rgb(13,92,182)",
              fontSize: "15px",
              fontweight: "700",
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
