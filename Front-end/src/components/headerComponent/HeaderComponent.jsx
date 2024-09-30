/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Badge, Button, Col, Dropdown, Image } from "antd";

import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout } from "./style";
import ButtonInputSearch from "../buttonInputSearch/ButtonInputSearch";
import mixilogo from "../../assets/images/mixilogo.jpg";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingComponent from "../loadingComponent/loadingComponent";

function HeaderComponent() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const onSearch = () => {
    alert("Search");
  };
  const onNavigateShopingCart = () => {
    navigate("/shoppingCart");
  };
  const onNavigateSHome = () => {
    navigate("/");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    //setLoading(true)
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    //setLoading(false)
  }, [user?.name, user?.avatar]);

  const handleLogOut = async () => {
    setLoading(true);
    console.log("setLoading1", loading);
    await UserService.logOutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    setLoading(false);
  };
  const items = [
    {
      key: "1",
      label: <p onClick={handleLogOut}>Đăng xuất</p>,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Update user
        </a>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
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
      <WrapperHeader>
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
        <Col span={13}>
          <ButtonInputSearch
            //allowClear size, placeholder,textButon
            textButton="Search"
            bordered=""
            size="large"
            onSearch={onSearch}
            placeholder="input search text"
          />
        </Col>
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
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottom"
                    arrow
                  >
                    <div style={{ cursor: "pointer" }}>{userName}</div>
                  </Dropdown>
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

          <div
            onClick={onNavigateShopingCart}
            style={{
              cursor: "pointer",
            }}
          >
            <Badge count={4} size="small">
              <ShoppingOutlined style={{ fontSize: "30px", color: "#fff" }} />
            </Badge>
            <WrapperTextHeader>Cart</WrapperTextHeader>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;