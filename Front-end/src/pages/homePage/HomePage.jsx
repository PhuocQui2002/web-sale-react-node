// eslint-disable-next-line no-unused-vars
import React from "react";
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
// import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//import NavbarComponent from "../../components/navbarComponent/NavbarComponent";

function HomePage() {
  const arr = ["Trang chủ", "Sản phẩm bán chạy", "Liên hệ", "Thông tin"];

  // const { data} = useQuery( {queryKey: ["products"], queryFn: async() => {
  //   const res = await  ProductService.getAllProduct()
  //   return res.json()
  // } )
  // const {data: users = [], refetch} = useQuery({queryKey:['users'], queryFn: async() => {
  //   const res = await fetch('http://localhost:5000/users')
  //   return res.json();
  //  })
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await ProductService.getAllProduct();
      return res;
    },  retry: 3, retryDelay: 1000,
  });
  console.log("data-product", products);
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <TypeProduct name={item} key={item} />
            );
          })}
        </WrapperTypeProduct>
      </div>

      <div className="body" style={{ width: "100%", background: "#efefef" }}>
        <div
          id="container"
          style={{
            width: "1270px",
            margin: "0 auto",
            height: "2000px",
          }}
        >
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts
          // style={{
          //   marginTop: "20px",
          //   display: "flex",
          //   alignItems: "center",
          //   gap: "55px",
          //   flexWrap: "wrap",
          // }}
          >
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
              textButton="Xem them"
              type="outline"
              styleButton={{
                border: "1px solid rgb(11,116,229)",
                color: "rgb(11,116,229)",
                width: "240px",
                height: "38px",
                borderRadius: "5px",
              }}
              styleStextButton={{ fontWeight: 500 }}
            />
          </div>
          {/* <NavbarComponent/> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
