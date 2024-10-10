// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import CartComponent from "../../components/cartComponent/CartComponent";
import * as ProductService from "../../services/ProductService";
import { Row, Col } from "antd";
import { Pagination } from "antd";
import { WrapperProducts, WrapperNavbar } from "./styles";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

function TypeProcduct() {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  console.log("searchProduct", searchProduct);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 8,
    total: 1,
  });
  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    //console.log("API response:", res);
    if (res?.status == "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      //console.log("API response:",state, panigate.page, panigate.limit);
      fetchProductType(state, panigate.page, panigate.limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, panigate.page, panigate.limit]);

  const onChange1 = (current, pageSize) => {
    // console.log("Trang hiện tại:", current);
    // console.log("Số sản phẩm mỗi trang:", pageSize);
    setPanigate({ ...panigate, page: current, limit: pageSize });
    //fetchProductType(state, current, pageSize);
  };
  return (
    <LoadingComponent isPending={loading}>
      <div
        style={{
          width: "100%",
          background: "#efefef",
          height: "700px",
        }}
      >
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
              paddingTop: "10px",
              height: "calc(100% - 5px)",
            }}
          >
            <WrapperNavbar style={{ width: "350px" }}>
              <NavbarComponent />
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
                {products
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
                }}
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange1}
                //total={100}
              />
            </Col>
          </Row>
        </div>
      </div>
    </LoadingComponent>
  );
}

export default TypeProcduct;
