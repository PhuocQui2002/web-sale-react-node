// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import CartComponent from "../../components/cartComponent/CartComponent";
import * as ProductService from "../../services/ProductService";
import { Row, Col, Select, Checkbox, Slider } from "antd";
import { Pagination } from "antd";
import { WrapperProducts, WrapperNavbar } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import {
  WrapperContent,
  WrapperLableText,
} from "../../components/navbarComponent/style";
import ButtonCpmponent from "../../components/buttonCpmponent/ButtonCpmponent";
import { MDBIcon } from "mdb-react-ui-kit";

function TypeProcduct() {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  //console.log("searchProduct", searchProduct);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([0, 100000]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { state } = useLocation();
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 8,
    total: 1,
  });

  const [typeProducts, setTypeProducts] = useState([]);

  const [selectedCheckbox, setSelectedCheckbox] = useState(state);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
    console.log("res", res);
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const onCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };

  const renderContent = (type, options) => {
    switch (type) {
      case "checkbox":
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {options.map((option) => (
              <Checkbox
                key={option}
                checked={selectedCheckbox === option}
                onChange={() => onCheckboxChange(option)}
                style={{ marginLeft: 0 }}
              >
                {option}
              </Checkbox>
            ))}
          </div>
        );
      default:
        return {};
    }
  };

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    console.log("API response:", res);
    if (res?.status == "OK") {
      setLoading(false);
      setFilteredProducts(res?.data);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      //console.log("API response:",state, panigate.page, panigate.limit);
      fetchProductType(selectedCheckbox, panigate.page, panigate.limit);
    }
  }, [selectedCheckbox, panigate.page, panigate.limit]);

  const onChange1 = (current, pageSize) => {
    // console.log("Trang hiện tại:", current);
    // console.log("Số sản phẩm mỗi trang:", pageSize);
    setPanigate((prev) => ({ ...prev, page: current - 1, limit: pageSize }));
    fetchProductType(selectedCheckbox, panigate.page, panigate.limit);
  };

  const onChange = (value) => {
    setPrices(value);
    console.log("onChange: ", prices);
  };
  const onChangeComplete = (value) => {
    setPrices(value);
    console.log("onChangeComplete: ", value);
  };
  const onFilterClick = () => {
    //console.log("onFilterClick", prices);
    const filtered = products.filter(
      (product) => product.price >= prices[0] && product.price <= prices[1]
    );
    //setProducts(filtered);
    setFilteredProducts(filtered);
  };
  const navigate = useNavigate();
  const onNavigateSHome = () => {
    navigate("/");
  };

  return (
    <LoadingComponent isPending={loading}>
      <div
        style={{
          width: "100%",
          background: "#efefef",
          height: "720px",
        }}
      >
        <div
          style={{
            height: "40px",
            backgroundColor: "#E0EAF4",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            padding: "0 15px",
            fontSize: "14px",
            color: "#333",
            width: "1270px",
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

          <div style={{ color: "#666" }}>Lọc sản phẩm</div>
        </div>
        <div
          style={{
            width: "1270px",
            margin: "0 auto",
            height: "100%",
          }}
        >
          <Row
            style={{
              flexWrap: "nowrap",

              height: "calc(100% - 5px)",
            }}
          >
            <WrapperNavbar style={{ width: "350px" }}>
              <WrapperLableText>Tìm kiếm theo sản phẩm</WrapperLableText>
              <WrapperContent>
                {renderContent("checkbox", typeProducts)}
              </WrapperContent>
              <WrapperLableText>Tìm kiếm theo giá</WrapperLableText>
              <Slider
                range
                step={100000}
                defaultValue={[0, 100000]}
                max={900000}
                onChange={onChange}
                onChangeComplete={onChangeComplete}
              />
              Giá: {prices?.join(" - ")}
              <ButtonCpmponent
                size={40}
                styleButton={{
                  background: "rgb(255,57,69)",
                  height: "30px",
                  width: "100px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "80px",
                }}
                textButton={"Lọc"}
                styleStextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontweight: "700",
                }}
                onClick={onFilterClick}
              />
            </WrapperNavbar>

            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <WrapperProducts span={20}>
                {filteredProducts
                  ?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        ?.toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
                    return (
                      <CartComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        selled={product.selled}
                        discount={product.discount}
                        id={product._id}
                      />
                    );
                  })}
              </WrapperProducts>
              <Pagination
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  //height: "10px",
                }}
                current={panigate.page + 1} 
                total={panigate?.total * panigate.limit} // Tổng số item thay vì số trang
                onChange={onChange1}
                pageSize={panigate.limit}
              />
            </Col>
          </Row>
        </div>
      </div>
    </LoadingComponent>
  );
}

export default TypeProcduct;
