export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];

    return (
      <div className="z-10 rounded-lg border bg-white px-3 py-2 text-base shadow-md">
        <p className="text-gray-500">{name}</p>
        <p className="font-semibold">₹{value}</p>
      </div>
    );
  }

  return null;
};
