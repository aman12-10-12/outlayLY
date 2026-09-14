import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const BRAND_COLORS = [
  "#4682B4", // blue
  "#20B2AA", // teal
  "#FF1493", // pink
  "#8B5FA8", // lavender (deep)
  "#87CEEB", // blue (light)
  "#00CED1", // teal (light)
  "#FF69B4", // pink (light)
  "#DDA0DD", // lavender (light)
];


const CHROME = {
  blue: {
    bg: "bg-[#F0F8FF]",
    shadow: "shadow-[8px_8px_18px_rgba(70,130,180,0.2),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    label: "#4A6B84",
    total: "#22415A",
  },
  teal: {
    bg: "bg-[#E0FFFF]",
    shadow: "shadow-[8px_8px_18px_rgba(32,178,170,0.25),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    label: "#3E8C86",
    total: "#0F6E68",
  },
  pink: {
    bg: "bg-[#FFF0F5]",
    shadow: "shadow-[8px_8px_18px_rgba(255,105,180,0.2),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    label: "#B0577E",
    total: "#8A1256",
  },
  lavender: {
    bg: "bg-[#F1EEFB]",
    shadow: "shadow-[8px_8px_18px_rgba(180,140,200,0.25),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    label: "#8B5FA8",
    total: "#6B3FA0",
  },
};

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors = BRAND_COLORS,
  showTextAnchor = true,
  variant = "blue",
}) => {
  const c = CHROME[variant] || CHROME.blue;

  return (
    <div className={`${c.bg} rounded-3xl p-4 ${c.shadow}`}>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={showTextAnchor ? 70 : 40}
            paddingAngle={2}
            cornerRadius={8}
            labelLine={false}
            label={({ cx, cy }) =>
              showTextAnchor ? (
                <>
                  <text
                    x={cx}
                    y={cy - 15}
                    textAnchor="middle"
                    fill={c.label}
                    fontSize="14px"
                    fontWeight="500"
                  >
                    {label}
                  </text>
                  <text
                    x={cx}
                    y={cy + 15}
                    textAnchor="middle"
                    fill={c.total}
                    fontSize="22px"
                    fontWeight="600"
                  >
                    {totalAmount}
                  </text>
                </>
              ) : null
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="#FFF"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip variant={variant} />} />
          <Legend
            content={<CustomLegend variant={variant} />}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
