// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/typeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperTypeProduct,
  WrapperProducts,
} from "./style";
import SliderComponent from "../../components/sliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider4.jpg";
import slider2 from "../../assets/images/slider5.jpg";
import slider3 from "../../assets/images/slider6.jpg";
import * as ProductService from "../../services/ProductService";
import CartComponent from "../../components/cartComponent/CartComponent";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import FooterComponent from "../../components/footerComponent/FooterComponent";

function HomePage() {
  const [limit, setLimit] = useState(10);
  const [typeProducts, setTypeProducts] = useState([]);

  //const arr = ["Trang chủ", "Sản phẩm bán chạy", "Liên hệ", "Thông tin"];

  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  //console.log("searchProduct", searchProduct);
  const fetchProductAll = async (context) => {
    const search = context?.queryKey && context?.queryKey[2];
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    console.log(res);
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
    console.log("res", res);
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  const {
    isLoading,
    data: products,
    isFetching,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
  });

  return (
    <LoadingComponent isPending={isLoading || isFetching} delay={0}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>

      <div className="body" style={{ width: "100%", background: "#efefef" }}>
        <div
          id="container"
          style={{
            width: "1270px",
            margin: "0 auto",
            //height: "1010px",
             minHeight: "1010px",
             
          }}
        >
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textButton={isFetching ? "Load more" : "Xem thêm"}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              onClick={() => setLimit((prev) => prev + 5)}
              type="outline"
              styleButton={{
                border: "1px solid rgb(11,116,229)",
                color: "rgb(11,116,229)",
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              styleStextButton={{ fontWeight: 500 }}
            />
          </div>
          <div style={{ height: "20px" }} />
        </div>
      </div>
      <FooterComponent/>
    </LoadingComponent>
  );
}

export default HomePage;
