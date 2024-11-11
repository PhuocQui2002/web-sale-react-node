import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { convertDataBarChart } from "../../utils";

const BarChartComponent = (props) => {
  const data = convertDataBarChart(props.data, props.field);
  //console.log("barChartComponent", data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barCategoryGap="10%">
        <XAxis
          dataKey="name"
          tick={{ fontSize: 14 }}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          tick={{ fontSize: 14 }}
          tickFormatter={(value) =>
            new Intl.NumberFormat("vi-VN").format(value)
          } // Format numbers
        />
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value)
          }
        />
        <Bar dataKey="value" fill="#8884d8" barSize={40}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
