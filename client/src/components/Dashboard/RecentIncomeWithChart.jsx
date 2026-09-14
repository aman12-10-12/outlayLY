import React, { useEffect, useState } from "react";

import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#0F6E68", "#159089", "#20B2AA", "#00CED1", "#5FDDE5", "#8FE9EE"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div>
      <h5 className="text-lg font-semibold text-[#0F6E68] mb-2 px-1">
        Last 60 Days Income
      </h5>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor={true}
        colors={COLORS}
        variant="teal"
      />
    </div>
  );
};

export default RecentIncomeWithChart;
