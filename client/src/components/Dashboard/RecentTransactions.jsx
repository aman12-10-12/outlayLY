import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";

import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-[#2F5F82]">Recent Transactions</h5>

        <button
          className="flex items-center gap-1 text-sm font-medium text-[#4682B4] bg-[#F0F8FF] px-3 py-1.5 rounded-lg shadow-[3px_3px_7px_rgba(70,130,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_6px_rgba(45,95,135,0.38),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-shadow"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type == "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
