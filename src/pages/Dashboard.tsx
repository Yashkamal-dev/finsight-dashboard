import { useState } from "react";
import Hero from "../components/Dashboard/Hero";
import Options from "../components/Dashboard/Options";
import SummaryCard from "../components/Dashboard/SummaryCard";
import TopBar from "../layouts/TopBar";

const Dashboard = () => {
  const [selected, setSelected] = useState<"month" | "week">("week");

  return (
    <div className="px-4">
      <TopBar
        pageTitle="Welcome back, Luke!"
        message="You're doing great—keep your finances on track."
      />
      <Options selected={selected} setSelected={setSelected} />
      <SummaryCard />
      <Hero selected={selected} />
    </div>
  );
};

export default Dashboard;
