import Hero from "../components/Dashboard/Hero";
import Options from "../components/Dashboard/Options";
import SummaryCard from "../components/Dashboard/SummaryCard";
import TopBar from "../layouts/TopBar";

const Dashboard = () => {
  return (
    <div className="px-4">
      <TopBar />
      <Options />
      <SummaryCard />
      <Hero />
    </div>
  );
};

export default Dashboard;
