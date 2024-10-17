/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Badge, Button, Col, Image, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccout,
  WrapperContentPopup,
} from "./style";
import ButtonInputSearch from "../buttonInputSearch/ButtonInputSearch";
import mixilogo from "../../assets/images/mixilogo.jpg";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlide";
import LoadingComponent from "../loadingComponent/loadingComponent";

// eslint-disable-next-line react/prop-types
function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");

  const order = useSelector((state) => state.order);

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  const onNavigateShopingCart = () => {
    navigate("/shoppingCart");
  };
  const onNavigateSHome = () => {
    navigate("/");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    //console.log("user?.name test", user?.name)
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const handleLogOut = async () => {
    //setLoading(true);
    console.log("setLoading1", loading);
    await UserService.logOutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    //setLoading(false);
  };
  const handleProfile = () => {
    navigate("/profilePage");
  };
  const handleMyOrder = () => {
    navigate("/myOderPage");
  };
  const handleAdmin = () => {
    navigate("/AdminPage");
  };
  const content = (
    <div>
      <WrapperContentPopup onClick={handleProfile}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleMyOrder}>
        Đơn hàng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={handleAdmin}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogOut}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        background: "black",
        //background: "rgb(239, 239, 239)",
        //background: "rgb(26,148,255)",
        display: "flex",
        justifyContent: "center",
        position: "sticky",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "999",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenSearch ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <Image
            src={mixilogo}
            preview={false}
            alt="logo-mixi"
            height="40px"
            width="60px"
            onClick={onNavigateSHome}
            style={{
              height: "40px",
              borderRadius: "50%",
              width: "55px",
              cursor: "pointer",
            }}
          />
          <WrapperTextHeader>MIXI SHOP</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              //allowClear size, placeholder,textButon
              textButton="Search"
              bordered=""
              size="large"
              onChange={onSearch}
              placeholder="input search text"
            />
          </Col>
        )}

        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <LoadingComponent isPending={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}

              {user?.name ? ( ///
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>{userName}</div>
                  </Popover>
                </>
              ) : (
                <div style={{ cursor: "pointer" }}>
                  <Link to="/login">
                    <span style={{ color: "#fff" }}>Login/Register </span>
                  </Link>

                  <div>
                    <span>Account</span>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </LoadingComponent>

          {!isHiddenCart && (
            <div
              onClick={onNavigateShopingCart}
              style={{
                cursor: "pointer",
              }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingOutlined style={{ fontSize: "30px", color: "#fff" }} />
              </Badge>
              <WrapperTextHeader>Cart</WrapperTextHeader>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;
