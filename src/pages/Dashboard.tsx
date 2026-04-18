import { useState } from "react";
import Hero from "../components/Dashboard/Hero";
import Options from "../components/Dashboard/Options";
import SummaryCard from "../components/Dashboard/SummaryCard";
import TopBar from "../layouts/TopBar";
import AddTransaction from "../components/general/AddTransaction";

const Dashboard = () => {
  // state to define selected option
  const [selected, setSelected] = useState<"month" | "week">("week");

  // state to mount and unmount the add transaction component
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <div className="px-4">
      <TopBar
        pageTitle="Welcome back, Luke!"
        message="You're doing great—keep your finances on track."
      />
      <Options
        selected={selected}
        setSelected={setSelected}
        setIsAdding={setIsAdding}
      />
      <SummaryCard />
      <Hero selected={selected} />

      {isAdding && <AddTransaction setIsAdding={setIsAdding} />}
    </div>
  );
};

export default Dashboard;
