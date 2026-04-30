import BudgetGraphCon from "../components/Analytics/BudgetGraphCon";
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

      <div>
        {/* budget graph container */}
        <BudgetGraphCon />
      </div>
    </div>
  );
};

export default Analytics;
