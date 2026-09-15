import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div>
      {/* No wrapping card */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h5 className="text-lg font-semibold text-[#8A1256]">Expense Overview</h5>
          <p className="text-xs text-[#C2185B]/70 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-[4px_4px_10px_rgba(255,105,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.85)] active:shadow-[inset_3px_3px_7px_rgba(219,60,140,0.4),inset_-3px_-3px_7px_rgba(255,255,255,0.6)] transition-shadow flex-shrink-0"
          style={{ backgroundColor: "#E0177E" }}
          onClick={onExpenseIncome}
        >
          <LuPlus className="text-lg" /> Add Expense
        </button>
      </div>

      <CustomLineChart data={chartData} />
    </div>
  );
};

export default ExpenseOverview;
