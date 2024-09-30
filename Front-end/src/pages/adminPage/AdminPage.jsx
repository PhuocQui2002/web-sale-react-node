// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/headerComponent/HeaderComponent";
const AdminPage = () => {
  const items = [
    getItem("Người dùng", "users", <UserOutlined />, [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
    ]),
    getItem("Sản phẩm", "products", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
    ]),
    getItem("Đơn hàng", "orders", <ShoppingCartOutlined />),
  ];

  const rootSubmenuKeys = ["user", "product"];
  const [openKeys, setOpenKeys] = useState(["user"]);
  const [keySelected, setKeySelected] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleOnCLick = ({ key }) => {
    console.log("key-onCLick", key);
    setKeySelected(key);
  };
  return (
    <>
    <HeaderComponent isHiddenSearch isHiddenCart />
    <div style={{ background: "#ccc", display: "flex" }}>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          width: 256,
          boxShadow: "1px 1px 2px #ccc",
          height: "740px",
        }}
        items={items}
        onClick={handleOnCLick}
      />
      <div style={{ flex: 1 }}>
        {keySelected === "6" && (
          <span
            style={{
              color: "red",
            }}
          >
            key là 6
          </span>
        )}
        <span
          style={{
            color: "red",
          }}
        >
          test
        </span>
      </div>
    </div>
    </>
  );
};

export default AdminPage;
