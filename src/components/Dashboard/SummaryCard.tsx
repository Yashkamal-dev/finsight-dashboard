import React from "react";

const SummaryCard = ({ n }: { n: number }) => {
  return (
    <div className="inline-flex w-full flex-col gap-4 rounded-4xl border border-[var(--border-default)] p-2 pb-4 pl-4">
      {/* heading link */}
      <div className="flex justify-between">
        <h3 className="pt-1 text-2xl font-semibold capitalize">
          total balance {n}
        </h3>
        <button className="cursor-pointer rounded-full border border-[var(--border-default)] p-2">
          <svg
            className="fill-[var(--text-primary)]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
          </svg>
        </button>
      </div>

      {/* amount message */}
      <div className="flex flex-col gap-6">
        <p className="text-4xl font-bold">
          ₹15000<span className="text-[var(--text-muted)]">.00</span>
        </p>
        <p className="text-[var(--text-secondary)]">
          <span className="rounded-full bg-[var(--success-bg)] px-1 text-[var(--success)]">
            12.1%
          </span>
          vs last month
        </p>
      </div>
    </div>
  );
};

const SummaryContainer = () => {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        <SummaryCard n={1} />
        <SummaryCard n={2} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        <SummaryCard n={3} />
        <SummaryCard n={4} />
      </div>
    </div>
  );
};

export default SummaryContainer;
