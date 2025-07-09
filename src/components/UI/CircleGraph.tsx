"use client";
import React from "react";

interface CircleGraphProps {
  currentDay: number;
  badgeDay: number;
  textDay?: number;
}

const CircleGraph = ({ currentDay, badgeDay, textDay }: CircleGraphProps) => {
  const progress =
    badgeDay > 0 ? Math.min((currentDay / badgeDay) * 100, 100) : 0;
  const filledColor = "#FFF782";
  const emptyColor = "#7C7C7C";

  return (
    <div className="relative w-[150px] h-[150px]">
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `conic-gradient(${filledColor} ${progress}%, ${emptyColor} ${progress}%)`,
          WebkitMaskImage:
            "radial-gradient(circle, transparent 0 55%, black 56% 100%)",
          maskImage:
            "radial-gradient(circle, transparent 0 55%, black 56% 100%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[32px] font-semibold text-white">
          {textDay ?? currentDay}일
        </span>
      </div>
    </div>
  );
};

export default CircleGraph;
