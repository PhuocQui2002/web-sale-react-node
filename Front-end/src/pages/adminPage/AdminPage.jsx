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
import AdminProductComponent from "../../components/adminProductComponent/AdminProductComponent";
import AdminUserComponent from "../../components/adminUserComponent/AdminUserComponent";
import AdminOderComponent from "../../components/adminOderComponent/AdminOderComponent";
const AdminPage = () => {
  const items = [
    getItem("Người dùng", "users", <UserOutlined />),
    getItem("Sản phẩm", "products", <AppstoreOutlined />),
    getItem("Đơn hàng", "orders", <ShoppingCartOutlined />),
  ];

  // const rootSubmenuKeys = ["user", "product"];
  // const [openKeys, setOpenKeys] = useState(["user"]);
  const [keySelected, setKeySelected] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <AdminUserComponent />;
      case "products":
        return <AdminProductComponent />;
      case "orders":
        return <AdminOderComponent />;
      default:
        return <></>;
    }
  };

  // eslint-disable-next-line no-unused-vars

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  console.log("key-onCLick", keySelected);
  return (
    <div style={{ background: "black" }}>
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
        <div style={{ flex: 1 }}>{renderPage(keySelected)}</div>
      </div>
    </div>
  );
};

export default AdminPage;
