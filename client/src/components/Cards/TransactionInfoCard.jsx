import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const typeStyles = {
  income: {
    badgeBg: "bg-[#E0FFFF]",
    badgeShadow: "shadow-[3px_3px_7px_rgba(32,178,170,0.22),-3px_-3px_7px_rgba(255,255,255,0.85)]",
    icon: "text-[#159089]",
    pillBg: "bg-[#E0FFFF]",
    pillText: "text-[#0F6E68]",
    rowHover: "hover:bg-[#E0FFFF]/50",
  },
  expense: {
    badgeBg: "bg-[#FFF0F5]",
    badgeShadow: "shadow-[3px_3px_7px_rgba(255,105,180,0.22),-3px_-3px_7px_rgba(255,255,255,0.85)]",
    icon: "text-[#E0177E]",
    pillBg: "bg-[#FFF0F5]",
    pillText: "text-[#C2185B]",
    rowHover: "hover:bg-[#FFF0F5]/50",
  },
};

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const s = typeStyles[type] || typeStyles.expense;

  return (
    <div className={`group relative flex items-center gap-4 mt-2 p-3 rounded-xl transition-colors duration-200 ${s.rowHover}`}>
      <div
        className={`w-12 h-12 flex items-center justify-center text-xl ${s.icon} ${s.badgeBg} ${s.badgeShadow} rounded-full flex-shrink-0`}
      >
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : type === "income" ? (
          <LuTrendingUp />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="min-w-0">
          <p className="text-sm text-gray-800 font-medium truncate">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
              aria-label="Delete transaction"
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)] ${s.pillBg} ${s.pillText}`}
          >
            <h6 className="text-sm font-semibold">
              {type === "income" ? "+" : "-"} ₹{amount}
            </h6>
            {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
