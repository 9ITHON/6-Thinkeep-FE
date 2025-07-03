import React from "react";

interface BarGraphProps {
  total: number;
  recorded: number;
}

const BarGraph = ({ total, recorded }: BarGraphProps) => {
  const nodes = Array.from({ length: total }, (_, i) => i + 1);

  const nodeSize = 32;
  const spacing = 70;
  const barLength = spacing * (total - 1);

  const filledLength =
    recorded === 0 ? 0 : spacing * (recorded - 1) + nodeSize / 2 + nodeSize;

  return (
    <div
      className="relative"
      style={{
        width: barLength + nodeSize,
        height: nodeSize,
      }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 bg-[#7C7C7C] rounded-full"
        style={{
          left: -nodeSize,
          width: barLength + nodeSize * 2,
          height: 15,
        }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 bg-[#FFEF7E] rounded-full"
        style={{
          left: -nodeSize,
          width: filledLength,
          height: 15,
          transition: "width 0.3s",
        }}
      />

      {nodes.map((num, index) => {
        const isFilled = index < recorded;

        return (
          <div
            key={num}
            className={`absolute top-1/2 -translate-y-1/2 w-[32px] h-[32px] ${
              isFilled ? "bg-[#FFEF7E] text-black" : "bg-[#1B1B17] text-white"
            } border-[3px] ${
              isFilled ? "border-[#FFEF7E]" : "border-[#7C7C7C]"
            } rounded-full flex items-center justify-center font-semibold text-[18px] leading-[23px]`}
            style={{
              left: spacing * index,
              transition: "background 0.3s, border 0.3s, color 0.3s",
            }}
          >
            {num}
          </div>
        );
      })}
    </div>
  );
};

export default BarGraph;
