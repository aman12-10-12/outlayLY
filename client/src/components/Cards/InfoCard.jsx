import React from "react";

const THEME = {
  blue: {
    bg: "bg-[#F0F8FF]",
    raised: "shadow-[8px_8px_16px_rgba(70,130,180,0.25),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(70,130,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(45,95,135,0.38),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#4682B4]",
    ink: "text-[#2F5F82]",
  },
  teal: {
    bg: "bg-[#E0FFFF]",
    raised: "shadow-[8px_8px_16px_rgba(32,178,170,0.28),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(32,178,170,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(20,140,135,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#159089]",
    ink: "text-[#0F6E68]",
  },
  pink: {
    bg: "bg-[#FFF0F5]",
    raised: "shadow-[8px_8px_16px_rgba(255,105,180,0.25),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(255,105,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(219,60,140,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#E0177E]",
    ink: "text-[#C2185B]",
  },
  lavender: {
    bg: "bg-[#F1EEFB]",
    raised: "shadow-[8px_8px_16px_rgba(180,140,200,0.28),-8px_-8px_16px_rgba(255,255,255,0.9)]",
    raisedSm: "shadow-[4px_4px_10px_rgba(180,140,200,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)]",
    pressed: "active:shadow-[inset_4px_4px_9px_rgba(150,110,175,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]",
    icon: "text-[#8B5FA8]",
    ink: "text-[#6B3FA0]",
  },
};

const legacyColorToVariant = (color) => {
  if (!color) return "blue";
  if (/emerald|green|teal|cyan/.test(color)) return "teal";
  if (/rose|red|pink/.test(color)) return "pink";
  if (/purple|violet|fuchsia/.test(color)) return "lavender";
  return "blue";
};

const InfoCard = ({
  icon,
  label,
  value,
  variant, 
  color, 
  currency = "₹",
  loading = false,
  trend = null, // 'up', 'down', or null
  trendValue = null,
  onClick = null,
}) => {
  const t = THEME[variant] || THEME[legacyColorToVariant(color)];

  const trendConfig = {
    up: { color: "text-emerald-700", bg: "bg-emerald-50", icon: "↑" },
    down: { color: "text-rose-700", bg: "bg-rose-50", icon: "↓" },
  };

  return (
    <div
      className={`
        group flex gap-5 p-6 rounded-2xl ${t.bg} ${t.raised} ${t.pressed}
        transition-all duration-300
        ${onClick ? "cursor-pointer hover:-translate-y-0.5" : ""}
        relative overflow-hidden
      `}
      onClick={onClick}
    >
      <div
        className={`
          w-14 h-14 flex items-center justify-center text-2xl
          ${t.bg} ${t.icon} ${t.raisedSm} rounded-2xl
          transition-transform duration-300
          group-hover:rotate-3 group-hover:scale-105
          flex-shrink-0
        `}
      >
        {icon}
      </div>

      <div className="flex flex-col justify-center">
        <h6 className={`text-xs font-medium mb-1 uppercase tracking-wider ${t.ink}`}>
          {label}
        </h6>

        {loading ? (
          <div className="h-7 w-32 bg-black/5 rounded-md animate-pulse"></div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              {currency}
              {Number(value ?? 0).toLocaleString()}
            </span>

            {trend && (
              <span
                className={`
                  text-xs px-2 py-1 rounded-full flex items-center gap-1
                  shadow-[inset_1px_1px_3px_rgba(0,0,0,0.06)]
                  ${trendConfig[trend].color} ${trendConfig[trend].bg}
                `}
              >
                {trendConfig[trend].icon} {trendValue}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
