import BarChartCard from "../../charts/BarChartCard";
import RecentTransaction from "../HeroComponents/RecentTransaction";

type props = {
  selected: "month" | "week";
};

const ChartRecentTransactionCon = ({ selected }: props) => {
  return (
    <div className="h-full w-full">
      <BarChartCard selected={selected} />
      <RecentTransaction />
    </div>
  );
};

export default ChartRecentTransactionCon;
