import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-[#0F6E68]">Income Source</h5>

        <button
          className="flex items-center gap-1.5 text-sm font-medium text-[#159089] bg-[#E0FFFF] px-3 py-1.5 rounded-lg shadow-[3px_3px_7px_rgba(32,178,170,0.28),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_6px_rgba(20,140,135,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-shadow"
          onClick={onDownload}
        >
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("DD MM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
