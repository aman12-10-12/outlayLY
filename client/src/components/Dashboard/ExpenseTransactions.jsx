import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";

import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-[#8A1256]">Expenses</h5>

        <button
          className="flex items-center gap-1 text-sm font-medium text-[#C2185B] bg-[#FFF0F5] px-3 py-1.5 rounded-lg shadow-[3px_3px_7px_rgba(255,105,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_6px_rgba(219,60,140,0.35),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-shadow"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("DD MM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
