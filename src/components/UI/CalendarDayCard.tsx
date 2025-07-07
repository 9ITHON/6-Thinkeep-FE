import React from "react";

export interface CalendarCardProps {
  date: number | string;
  mood?: "yellow" | "blue" | "red" | "gray" | "disabled";
  onClick?: () => void;
}

const moodColors: Record<NonNullable<CalendarCardProps["mood"]>, string> = {
  yellow: "bg-[#FFF782] text-[#1B1B17]",
  blue: "bg-[#85BEFF] text-[#1B1B17]",
  red: "bg-[#FF7C68] text-[#1B1B17]",
  gray: "bg-[#E6E6E6] text-[#1B1B17]",
  disabled: "bg-[#1B1B17] text-[#7C7C7C]",
};

const CalendarDayCard = ({
  date,
  mood = "disabled",
  onClick,
}: CalendarCardProps) => {
  return (
    <div
      className={`relative w-[49px] h-[76px] rounded-[7px] flex items-center justify-center`}
      onClick={onClick}
    >
      <div
        className={`w-[49px] h-[76px] rounded-[5px] flex items-start justify-center pt-[10px] font-semibold text-[18px] leading-[23px] tracking-[-0.02em] ${
          mood === "disabled" ? "" : moodColors[mood]
        } `}
      >
        <span className={mood === "disabled" ? moodColors["disabled"] : ""}>
          {date}
        </span>
      </div>
    </div>
  );
};

export default CalendarDayCard;
