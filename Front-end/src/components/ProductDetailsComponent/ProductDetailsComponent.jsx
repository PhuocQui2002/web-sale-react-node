import React, { useEffect, useState } from "react";
import { Col, Row, Image, Rate, Select, Radio, message } from "antd";
import img from "../../assets/images/logoDN.jpg";

import { StarFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import * as SizeService from "../../services/SizeService";
import * as FrameService from "../../services/FrameService";
import * as CartService from "../../services/CartService";

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
import { addOrderProduct, buyNowProduct } from "../../redux/slides/orderSlide";
import { useMutationHooks } from "../../hooks/useMutationHook";

const ProductDetailsComponent = ({ idProduct }) => {
  // useEffect(() => {
  //   fetchGetDetailsProduct();
  // }, []);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [frameType, setFrameType] = useState("none");
  const [numProduct, setNumProduct] = useState(1);

  const [size, setSize] = useState("Nhỏ (40x60 cm)");

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

  const fetchGetSize = async () => {
    const res = await SizeService.getAllSize();
    //console.log("fetchGetSize1", res )
    return res.data;
  };

  const fetchGetEavluate = async () => {
    const res = await SizeService.getAllSize();
    //console.log("fetchGetSize1", res )
    return res.data;
  };

  const {
    isLoading: isLoadingSize,
    isError: isErrorSize,
    data: sizeDetails,
  } = useQuery({
    queryKey: ["Size"],
    queryFn: fetchGetSize,
    enabled: !!idProduct,
  });
  //console.log("fetchGetSize", sizeDetails);

  const fetchGetFrame = async () => {
    const res = await FrameService.getFrame();
    //console.log("fetchGetSize1", res )
    return res.data;
  };

  const {
    isLoading: isLoadingFrame,
    isError: isErrorFrame,
    data: frameDetails,
  } = useQuery({
    queryKey: ["Frame"],
    queryFn: fetchGetFrame,
  });
  //console.log("frameDetails", frameDetails);

  const {
    isLoading,
    isError,
    data: productDetails,
  } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct, // Chỉ thực hiện truy vấn khi idProduct có giá trị
  });

  // console.log("productDetails", productDetails);
  // console.log("user", user);

  const handleChangeCount = (type, limited) => {
    console.log("type", type);
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };
  //console.log("numProduct:", numProduct);

  const mutation = useMutationHooks((data) => {
    const { userID, orderItems } = data;
    //console.log("data", data);

    const res = CartService.createCart({
      userID,
      orderItems,
    });
    return res;
  });
  const { data } = mutation;
  //console.log("data-addCart", data);

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/login", { state: location?.pathname });
    } else {
      const orderItem = {
        name: productDetails?.name,
        amount: numProduct,
        image: productDetails?.image,
        type: productDetails?.type,
        product: productDetails?._id,
        size: size,
        frame: frameType,
        totalPrice: productDetails?.price + TotalPrice,
        discount: productDetails?.discount,
        countInstock: productDetails?.countInStock,
      };
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            type: productDetails?.type,
            product: productDetails?._id,
            size: size,
            frame: frameType,
            totalPrice: productDetails?.price + TotalPrice,
            discount: productDetails?.discount,
            countInstock: productDetails?.countInStock,
          },
        })
      );
      mutation.mutate({
        userID: user?.id,
        orderItems: [orderItem]
      });
      message.success("Thêm sản phẩm vào giỏ hàng thành công!");
    }
  };

  const handleSize = (e) => {
    setSize(e?.target?.value);
    //updateSoluong(e?.target?.value);
    //console.log("size:", e.target.value);
  };

  // const updateSoluong = (size) => {
  //   if (size === "Lớn (80x120 cm)") {
  //     setNumProduct(1);
  //   } else if (size === "Trung bình (60x90 cm)") {
  //     setNumProduct(2);
  //   } else {
  //     setNumProduct(3);
  //   }
  // };
  const handleSelectFrame = (value) => {
    setFrameType(value);
    //console.log("setFrameType:", value);
  };

  const selectedSize = sizeDetails?.find((item) => item.nameSize === size);
  const sizePrice = selectedSize ? selectedSize.priceSize : 0;
  //console.log("sizePrice:", sizePrice);

  const selectedFrame = frameDetails?.find(
    (item) => item.nameFrame === frameType
  );
  const framePrice = selectedFrame ? selectedFrame.priceFrame : 0;
  //console.log("framePrice:", framePrice);

  const TotalPrice = framePrice + sizePrice;

  const handleAddCard = () => {
    if (!user?.id) {
      navigate("/login", { state: location?.pathname });
    } else {
      dispatch(
        buyNowProduct({
          name: productDetails?.name,
          amount: numProduct,
          image: productDetails?.image,
          type: productDetails?.type,
          product: productDetails?._id,
          size: size,
          frame: frameType,
          totalPrice: productDetails?.price + TotalPrice,
          discount: productDetails?.discount,
          countInstock: productDetails?.countInStock,
        })
      );
    }
    navigate("/payment");
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
          <span
            style={{
              fontFamily: "Playfair Display, serif",
            }}
          >
            {productDetails?.name}
          </span>
        </WrapperStyleNameProduct>
        <div>
          <Rate
            allowHalf
            defaultValue={productDetails?.rating}
            value={productDetails?.rating}
          />

          <WrapperStyleTextSell>
            {" "}
            | Đã bán {productDetails?.selled}+
          </WrapperStyleTextSell>
        </div>

        <p
          style={{
            fontSize: "15px",
          }}
        >
          {productDetails?.description}
        </p>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            Giá {(productDetails?.price + TotalPrice).toLocaleString()} VNĐ
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>
        {/* <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">{user?.address}</span>-
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct> */}
        <div
          style={{
            margin: "10px 0 20px",
            padding: "10px 0",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div style={{ marginTop: "6px", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "20px",
              }}
            >
              Số lượng trong kho {productDetails?.countInStock}
            </span>{" "}
          </div>
          <WrapperQualityProduct>
            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleChangeCount("decrease", numProduct === 1)}
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
              onClick={() =>
                handleChangeCount(
                  "increase",
                  numProduct === productDetails?.countInStock
                )
              }
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
        <div>
          <div>
            <div style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Chọn kích thước tranh:
              </span>
              <Radio.Group
                onChange={(e) => {
                  handleSize(e);
                }}
                value={size}
                style={{ marginTop: "10px" }}
              >
                {sizeDetails?.map((item) => (
                  <Radio key={item._id} value={item.nameSize}>
                    {item?.nameSize}
                    {/* ({item.priceSize} VND) */}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Chọn loại khung:
              </span>
              <Select
                defaultValue="Không khung"
                style={{ width: 200, marginTop: "10px", marginRight: "10px" }}
                onChange={handleSelectFrame}
              >
                {frameDetails?.map((frame) => (
                  <Select.Option key={frame._id} value={frame.nameFrame}>
                    {frame.nameFrame} - {frame.priceFrame.toLocaleString()} VND
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
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
            onClick={handleAddCard}
          />
          <ButtonCpmponent
            //bodered={false}
            //onClick={() => addToCart(product)}
            onClick={handleAddOrderProduct}
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
