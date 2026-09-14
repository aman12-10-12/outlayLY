import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FFF7FA] shadow-[6px_6px_14px_rgba(255,105,180,0.22),-6px_-6px_14px_rgba(255,255,255,0.9)] rounded-xl p-4">
          <p className="text-sm font-semibold text-[#8A1256] mb-1">
            {payload[0].payload.category}
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "linear-gradient(90deg, #FF1493, #FF69B4)" }}></div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Amount: </span>
              <span className="font-bold text-[#C2185B]">
                ₹{payload[0].payload.amount.toLocaleString('en-In', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#FFF0F5] p-6 rounded-3xl shadow-[8px_8px_18px_rgba(255,105,180,0.2),-8px_-8px_18px_rgba(255,255,255,0.9)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#8A1256]">Expense Trend</h3>
          <p className="text-sm text-[#C2185B]/70">Last 12 months performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(90deg, #FF1493, #FF69B4)" }}></div>
          <span className="text-sm font-medium text-[#C2185B]">Expense</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="expenseAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF1493" stopOpacity={0.35} />
              <stop offset="80%" stopColor="#FF1493" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#FF1493" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#FF69B4" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#FBDCE7"
            vertical={false}
            strokeOpacity={0.7}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#B0577E",
              fontFamily: "Inter, sans-serif"
            }}
            padding={{ left: 20, right: 20 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#B0577E",
              fontFamily: "Inter, sans-serif"
            }}
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
            width={80}
          />

          <Tooltip
            content={CustomToolTip}
            cursor={{
              stroke: "#FF69B4",
              strokeWidth: 1,
              strokeDasharray: "0",
              fill: "rgba(255, 105, 180, 0.06)"
            }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="url(#expenseLineGradient)"
            strokeWidth={3}
            fill="url(#expenseAreaGradient)"
            fillOpacity={1}
            activeDot={{
              r: 8,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#FF1493"
            }}
            dot={{
              r: 4,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#FF1493"
            }}
            animationEasing="ease-out"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex justify-end mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#C2185B]/60">Updated: {new Date().toLocaleDateString()}</span>
          <div className="w-1 h-1 rounded-full bg-[#C2185B]/40"></div>
          <span className="text-xs text-[#C2185B]/60">INR</span>
        </div>
      </div>
    </div>
  );
};

export default CustomLineChart;
