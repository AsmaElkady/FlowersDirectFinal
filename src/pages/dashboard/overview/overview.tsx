import {
  RadialBarChart,
  RadialBar,
  Legend,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text,
} from "recharts";
import useDashboard from "../../../hooks/useDashboard";
import { colorsArr } from "../../../constants/main";
import Revenue from "../revenue/revenue";

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const OverView = () => {
  const { productsStock, ProductsByCategory } = useDashboard();
  const data = ProductsByCategory.map((prod, index) => {
    return { ...prod, fill: colorsArr[index] };
  });

  const stock = productsStock.map((prod) => {
    const color = data.filter((category) => category.name == prod.category)[0]
      ?.fill;
    return { ...prod, fill: color };
  });

  return (
    <div>
      <Revenue />
      <h1 className="m-3">Dashboard</h1>
      <div className="d-flex justify-content-between mb-5">
        <RadialBarChart
          style={{
            width: "50%",
            maxWidth: "600px",
            maxHeight: "80vh",
            aspectRatio: 1.618,
          }}
          responsive
          cx="30%"
          barSize={10}
          data={data}
        >
          <RadialBar
            label={{ position: "insideStart", fill: "#fff" }}
            dataKey="uv"
          />
          <Tooltip cursor={{ fill: "transparent" }} />

          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
          <Text
            x={180}
            y={20}
            fill="#333"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={20}
          >
            Categories
          </Text>
        </RadialBarChart>
        <BarChart
          style={{
            width: "50%",
            maxWidth: "500px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={stock}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 10" />
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip
            contentStyle={{ backgroundColor: "transparent", border: "none" }}
          />
          <Legend />

          <Bar
            dataKey="stock"
            fill={colorsArr[3]}
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default OverView;
