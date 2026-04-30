import BudgetGraphCon from "../components/Analytics/BudgetGraphCon";
import PieChartCon from "../components/Analytics/PieChartCon";
import SummaryCon from "../components/Analytics/summaryCon";
import TopBar from "../layouts/TopBar";

const Analytics = () => {
  return (
    <div className="px-4">
      {/* topbar of th analytics page */}
      <TopBar
        pageTitle="Analytics"
        message="Understand your savings and goal performance"
      />

      {/* summary container */}
      <SummaryCon />

      <div className="flex gap-4 py-4 flex-wrap" >
        {/* budget graph container */}
        <BudgetGraphCon />

        {/* pie chart of the transaction */}
        <PieChartCon /> 
      </div>
    </div>
  );
};

export default Analytics;
