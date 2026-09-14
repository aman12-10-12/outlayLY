import React, { useEffect, useState } from "react";

import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="col-span-1">
      <h5 className="text-lg font-semibold text-[#8A1256] mb-2 px-1">
        Last 30 Days Expenses
      </h5>
      <CustomBarChart data={chartData} variant="pink" xKey="category" />
    </div>
  );
};

export default Last30DaysExpenses;
