import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const THEME = {
  mixed: {
    bg: "bg-[#F0F8FF]",
    shadow: "shadow-[8px_8px_18px_rgba(70,130,180,0.22),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    title: "text-[#22415A]",
    grid: "#D7E6F0",
    axisLine: "#C7DCEA",
    tick: "#4A6B84",
    cursor: "rgba(70, 130, 180, 0.08)",
    tooltipBg: "bg-[#F7FBFF]",
    tooltipShadow: "shadow-[6px_6px_14px_rgba(70,130,180,0.2),-6px_-6px_14px_rgba(255,255,255,0.9)]",
    tooltipTitle: "text-[#22415A]",
    tooltipAmount: "text-[#4682B4]",
  },
  teal: {
    bg: "bg-[#E0FFFF]",
    shadow: "shadow-[8px_8px_18px_rgba(32,178,170,0.25),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    title: "text-[#0F6E68]",
    grid: "#CDEFEC",
    axisLine: "#B9E6E1",
    tick: "#3E8C86",
    cursor: "rgba(32, 178, 170, 0.08)",
    tooltipBg: "bg-[#F5FFFF]",
    tooltipShadow: "shadow-[6px_6px_14px_rgba(32,178,170,0.22),-6px_-6px_14px_rgba(255,255,255,0.9)]",
    tooltipTitle: "text-[#0F6E68]",
    tooltipAmount: "text-[#159089]",
  },
  pink: {
    bg: "bg-[#FFF0F5]",
    shadow: "shadow-[8px_8px_18px_rgba(255,105,180,0.2),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    title: "text-[#8A1256]",
    grid: "#FBDCE7",
    axisLine: "#F7C7DA",
    tick: "#B0577E",
    cursor: "rgba(255, 105, 180, 0.08)",
    tooltipBg: "bg-[#FFF7FA]",
    tooltipShadow: "shadow-[6px_6px_14px_rgba(255,105,180,0.22),-6px_-6px_14px_rgba(255,255,255,0.9)]",
    tooltipTitle: "text-[#8A1256]",
    tooltipAmount: "text-[#C2185B]",
  },
  lavender: {
    bg: "bg-[#F1EEFB]",
    shadow: "shadow-[8px_8px_18px_rgba(180,140,200,0.25),-8px_-8px_18px_rgba(255,255,255,0.9)]",
    title: "text-[#6B3FA0]",
    grid: "#E4DBF5",
    axisLine: "#D9CBF0",
    tick: "#8B5FA8",
    cursor: "rgba(180, 140, 200, 0.1)",
    tooltipBg: "bg-[#F8F5FC]",
    tooltipShadow: "shadow-[6px_6px_14px_rgba(180,140,200,0.25),-6px_-6px_14px_rgba(255,255,255,0.9)]",
    tooltipTitle: "text-[#6B3FA0]",
    tooltipAmount: "text-[#8B5FA8]",
  },
};
THEME.blue = THEME.mixed;

const GRADIENT_IDS = {
  blue: "gradientBlue",
  teal: "gradientTeal",
  pink: "gradientPink",
  lavender: "gradientLavender",
};

const CustomBarChart = ({ data, title, variant = "mixed", xKey = "month", labelKey = "category" }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const t = THEME[variant] || THEME.mixed;
  const isSingleFamily = variant !== "mixed" && GRADIENT_IDS[variant];

  const getBarColor = (index) => {
    if (isSingleFamily) return `url(#${GRADIENT_IDS[variant]})`;
    const cycle = ["gradientBlue", "gradientTeal", "gradientPink", "gradientLavender"];
    return `url(#${cycle[index % cycle.length]})`;
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${t.tooltipBg} ${t.tooltipShadow} rounded-xl p-3`}>
          <p className={`text-sm font-bold mb-1 ${t.tooltipTitle}`}>
            {payload[0].payload[labelKey]}
          </p>
          <p className="text-sm text-gray-600 font-medium">
            Amount:{" "}
            <span className={`text-sm font-bold ${t.tooltipAmount}`}>
              ₹{payload[0].payload.amount.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className={`${t.bg} p-6 rounded-3xl ${t.shadow} overflow-x-auto`}>
      {title && <h3 className={`text-xl font-bold mb-4 ${t.title}`}>{title}</h3>}

      <div style={{ width: `${data.length * 32}px`, minWidth: "100%" }}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4682B4" />
                <stop offset="100%" stopColor="#87CEEB" />
              </linearGradient>
              <linearGradient id="gradientTeal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#159089" />
                <stop offset="100%" stopColor="#00CED1" />
              </linearGradient>
              <linearGradient id="gradientPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF1493" />
                <stop offset="100%" stopColor="#FF69B4" />
              </linearGradient>
              <linearGradient id="gradientLavender" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5FA8" />
                <stop offset="100%" stopColor="#DDA0DD" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />

            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: t.tick }}
              axisLine={{ stroke: t.axisLine }}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              tick={{ fontSize: 12, fill: t.tick }}
              axisLine={{ stroke: t.axisLine }}
              tickLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />

            <Tooltip
              content={CustomToolTip}
              cursor={{ fill: t.cursor }}
            />

            <Bar
              dataKey="amount"
              radius={[12, 12, 0, 0]}
              barSize={14}
              onMouseEnter={handleMouseEnter}
              activeBar={{
                radius: [12, 12, 0, 0],
                stroke: "#fff",
                strokeWidth: 2,
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={getBarColor(index)}
                  strokeWidth={index === activeIndex ? 2 : 0}
                  stroke="#fff"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
