import BudgetGraphCon from "../components/Analytics/BudgetGraphCon";
import PieChartCon from "../components/Analytics/PieChartCon";
import SummaryCon from "../components/Analytics/SummaryCon";
import TopBar from "../layouts/TopBar";

const Analytics = () => {
  return (
    <div className="px-4 transition-all duration-500 ease-in-out">
      {/* topbar of th analytics page */}
      <TopBar
        pageTitle="Analytics"
        message="Understand your savings and goal performance"
      />

      {/* summary container */}
      <SummaryCon />

      <div className="flex flex-wrap gap-4 py-4">
        {/* budget graph container */}
        <BudgetGraphCon />

        {/* pie chart of the transaction */}
        <PieChartCon />
      </div>
    </div>
  );
};

export default Analytics;
