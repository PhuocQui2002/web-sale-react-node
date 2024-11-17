import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  
} from "recharts";
const sortDataByMonth = (data) => {
  const monthOrder = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  return data.sort((a, b) => {
    const monthA = a.month.split("-")[1]; // Lấy phần "MM" từ "YYYY-MM"
    const monthB = b.month.split("-")[1];
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  });
};

const RevenueChartComponent = ({ data }) => {
  const sortedData = sortDataByMonth(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barCategoryGap="10%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 14 }}/>
        <YAxis tick={{ fontSize: 14 }}/>
        <Tooltip />
        
        <defs>
          <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#42a5f5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#42a5f5" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#42a5f5"
          fill="url(#colorArea)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueChartComponent;
