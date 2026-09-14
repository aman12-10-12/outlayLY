import moment from "moment";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-[#0F6E68]">Income</h5>

        <button
          className="flex items-center gap-1 text-sm font-medium text-[#159089] bg-[#E0FFFF] px-3 py-1.5 rounded-lg shadow-[3px_3px_7px_rgba(32,178,170,0.28),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_6px_rgba(20,140,135,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-shadow"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
