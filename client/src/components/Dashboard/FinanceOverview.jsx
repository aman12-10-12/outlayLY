import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#4682B4", "#FF1493", "#20B2AA"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div>
      <h5 className="text-lg font-semibold text-[#2F5F82] mb-2 px-1">
        Financial Overview
      </h5>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        variant="blue"
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
