import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h5 className="text-lg font-semibold text-[#0F6E68]">Income Overview</h5>
          <p className="text-xs text-[#159089]/70 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-[4px_4px_10px_rgba(32,178,170,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)] active:shadow-[inset_3px_3px_7px_rgba(20,140,135,0.4),inset_-3px_-3px_7px_rgba(255,255,255,0.6)] transition-shadow flex-shrink-0"
          style={{ backgroundColor: "#159089" }}
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" /> Add Income
        </button>
      </div>

      <CustomBarChart data={chartData} variant="teal" labelKey="source" />
    </div>
  );
};

export default IncomeOverview;
