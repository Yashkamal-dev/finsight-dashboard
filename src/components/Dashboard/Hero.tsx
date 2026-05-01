import ChartRecentTransactionCon from "./HeroContainer/ChartRecentTransactionCon";

type props = {
  selected: "month" | "week";
};

const Hero = ({ selected }: props) => {
  return (
    <div className="py-4">
      <ChartRecentTransactionCon selected={selected} />
    </div>
  );
};

export default Hero;
