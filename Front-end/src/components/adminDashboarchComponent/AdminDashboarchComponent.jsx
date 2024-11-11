import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import TableComponent from "../tableComponent/table";
import { convertPrice } from "../../utils";
import { orderContant } from "../../contant";
import InputComponent from "../inputComponent/InputComponent";

import { SnippetsOutlined, EditOutlined } from "@ant-design/icons";
import PieChartComponent from "../pieChartComponent/PieChartComponent";
import PieChartTypeComponent from "../pieChartComponent/PieChartTypeComponent";

import DrawerComponent from "../drawerComponent/DrawerComponent";
import { Button, Form, Image, message, Tabs } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHook";
import BarChartComponent from "../pieChartComponent/BarChartComponent ";
import LineChartComponent from "../pieChartComponent/LineChartComponent ";
import {
  ContactsOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
const AdminDashboarchComponent = () => {
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({
    queryKey: ["ordersupdate"],
    queryFn: getAllOrder,
  });
  const { data: orders } = queryOrder;
  console.log(orders?.data);
  const totalPriceReceived = orders?.data?.reduce((total, order) => {
    return order.isPaid ? total + order.totalPrice : total;
  }, 0);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          backgroundColor: "#181a25",
        }}
      >
        <div
          style={{
            backgroundColor: "#3366ff", // Màu nền xanh dương
            color: "#fff",
            padding: "20px",
            borderRadius: "8px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "0.9em", fontWeight: "bold", opacity: 0.8 }}>
            DOANH THU
          </div>
          <div style={{ fontSize: "1.8em", fontWeight: "bold" }}>
            {convertPrice(totalPriceReceived)}
          </div>
          <DollarOutlined
            style={{
              position: "absolute",
              top: "20px",
              right: "10px",
              fontSize: "1.2em",
              opacity: 0.8,
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: "#424874", // Màu nền xám tím
            color: "#fff",
            padding: "20px",
            borderRadius: "8px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "1.2em", fontWeight: "bold", opacity: 0.8 }}>
            Đơn hàng
          </div>
          <div style={{ fontSize: "1.8em", fontWeight: "bold" }}>
            {orders?.data?.length || 0}
          </div>
          <ShoppingCartOutlined
            style={{
              position: "absolute",
              top: "20px",
              right: "10px",
              fontSize: "1.2em",
              opacity: 0.8,
            }}
          />
        </div>
      </div>
      <div style={{  marginLeft: "100px"}}>
        <p style={{textAlign:"center"}}>Top 5 khách hàng tiềm năng</p>
        <BarChartComponent data={orders?.data} field="isDelivered" />
      </div>
    </div>
  );
};

export default AdminDashboarchComponent;
