// eslint-disable-next-line no-unused-vars
import React from "react";
import { Col, Row, Image } from "antd";
import img from "../../assets/images/logoDN.jpg";
//import imgSmall from "../../assets/images/imagesmall.webp";
import { StarFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  // WrapperStyleColImage,
  // WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
} from "./style";
import ButtonCpmponent from "../buttonCpmponent/ButtonCpmponent";

function ProductDetailsComponent() {
//   const [cart, setCart] = useState([]); 
//   const [product, setProduct] = useState(null);

//   const addToCart = (product) => {
//       setCart((prevCart) => [...prevCart, product]); 
//       alert('Them thanh cong');
//   };
//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId)); 
// };
  return (
    <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "5px" }}
      >
        <Image src={img} alt="img product" preview={true} />
        {/* <Row
          style={{
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imgSmall}
              alt="img small"
              preview={true}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imgSmall}
              alt="img small"
              preview={true}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imgSmall}
              alt="img small"
              preview={true}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imgSmall}
              alt="img small"
              preview={true}
            />
          </WrapperStyleColImage>
          
        </Row> */}
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperStyleNameProduct>Tranh phong cảnh</WrapperStyleNameProduct>
        <div>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
          <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>Giá: 200$</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">3/2,Quận Ninh Kiều, TP Cần Thơ</span>-
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
          <div style={{ marginTop: "6px" }}>Số lượng</div>
          <WrapperQualityProduct>
            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <MinusOutlined
                style={{
                  color: "#000",
                  fontSize: "20px",
                }}
              />
            </button>
            <WrapperInputNumber defaultValue={3} size="3" />
            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
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
}

export default ProductDetailsComponent;
