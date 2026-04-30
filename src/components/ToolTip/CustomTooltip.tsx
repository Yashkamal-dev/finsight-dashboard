export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];

    return (
      <div className="z-10 rounded-lg border bg-[var(--bg-secondary)] px-3 py-2 text-base shadow-md">
        <p className="text-[var(--text-muted)]">{name}</p>
        <p className="font-semibold text-[var(--text-primary)]">₹{value}</p>
      </div>
    );
  }

  return null;
};
