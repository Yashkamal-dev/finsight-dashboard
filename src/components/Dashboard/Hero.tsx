import React from "react";
import ChartRecentTransactionCon from "./HeroContainer/ChartRecentTransactionCon";

type props = {
  selected: "month" | "week";
};

const Hero = ({ selected }: props) => {
  return (
    <div className="">
      <ChartRecentTransactionCon selected={selected} />
    </div>
  );
};

export default Hero;
