import Options from "../components/Dashboard/Options";
import SummaryCard from "../components/Dashboard/SummaryCard";
import TopBar from "../layouts/TopBar";

const Dashboard = () => {
  return (
    <div className="px-4">
      <TopBar />
      <Options />
      <SummaryCard />
    </div>
  );
};

export default Dashboard;
