import React from "react";

const CHROME = {
  blue: {
    bg: "bg-[#F7FBFF]",
    shadow: "shadow-[4px_4px_10px_rgba(70,130,180,0.2),-4px_-4px_10px_rgba(255,255,255,0.9)]",
    title: "text-[#22415A]",
    label: "text-[#4A6B84]",
  },
  teal: {
    bg: "bg-[#F5FFFF]",
    shadow: "shadow-[4px_4px_10px_rgba(32,178,170,0.22),-4px_-4px_10px_rgba(255,255,255,0.9)]",
    title: "text-[#0F6E68]",
    label: "text-[#3E8C86]",
  },
  pink: {
    bg: "bg-[#FFF7FA]",
    shadow: "shadow-[4px_4px_10px_rgba(255,105,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.9)]",
    title: "text-[#8A1256]",
    label: "text-[#B0577E]",
  },
  lavender: {
    bg: "bg-[#F8F5FC]",
    shadow: "shadow-[4px_4px_10px_rgba(180,140,200,0.25),-4px_-4px_10px_rgba(255,255,255,0.9)]",
    title: "text-[#6B3FA0]",
    label: "text-[#8B5FA8]",
  },
};

const CustomTooltip = ({ active, payload, variant = "blue" }) => {
  if (active && payload && payload.length) {
    const categoryColor = payload[0].payload.fill; // Color from the pie segment itself
    const c = CHROME[variant] || CHROME.blue;

    return (
      <div className={`${c.bg} ${c.shadow} rounded-xl p-3`}>
        <div className="flex items-center mb-1">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: categoryColor }}
          />
          <p className={`text-sm font-bold ${c.title}`}>
            {payload[0].name}
          </p>
        </div>
        <div className="flex justify-between items-center gap-3">
          <span className={`text-xs font-medium ${c.label}`}>Amount:</span>
          <span className="text-sm font-bold" style={{ color: categoryColor }}>
            ₹{payload[0].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
