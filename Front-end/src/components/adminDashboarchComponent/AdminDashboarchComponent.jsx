import React from "react";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils";
import BarChartComponent from "../pieChartComponent/BarChartComponent ";
import {
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import RevenueChartComponent from "../pieChartComponent/RevenueChartComponet";
// Helper function để nhóm doanh thu theo tháng
const groupRevenueByMonth = (orders) => {
  const monthlyRevenue = {};

  orders.forEach((order) => {
    if (order.isPaid) {
      // Chỉ tính các đơn hàng đã thanh toán
      const date = new Date(order.createdAt);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`; // YYYY-MM
      if (!monthlyRevenue[month]) {
        monthlyRevenue[month] = 0;
      }
      monthlyRevenue[month] += order.totalPrice;
    }
  });

  // Convert object to array for chart
  return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue,
  }));
};

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
  const revenueData = orders ? groupRevenueByMonth(orders?.data) : [];
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
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "50px", width: "45%" }}>
          <p style={{ textAlign: "center" }}>Top 5 khách hàng tiềm năng</p>
          <BarChartComponent data={orders?.data} field="isDelivered" />
        </div>
        <div style={{ color: "black",width: "50%"}}>
          <p style={{ textAlign: "center", color: "#4f4f4f" }}>
            Thống kê doanh thu theo tháng
          </p>
          <RevenueChartComponent data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboarchComponent;
