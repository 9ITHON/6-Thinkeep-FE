import React from "react";

interface CalendarMonthProps {
  selected: string;
  onSelect: (month: string) => void;
}

const CalendarMonth = ({ selected, onSelect }: CalendarMonthProps) => {
  const months = [];

  // 2025년부터 2026년까지의 월 생성
  for (let year = 2025; year <= 2026; year++) {
    for (let month = 1; month <= 12; month++) {
      const formatted = `${year}.${month.toString().padStart(2, "0")}`;
      months.push(formatted);
    }
  }

  return (
    <div
      className="absolute w-[200px] left-1/2 top-[64px] -translate-x-1/2
             bg-[#2D2D29] shadow-[0px_4px_40px_rgba(0,0,0,0.5)] rounded-[25px]
             flex flex-col items-center py-3 z-50 max-h-[240px] overflow-y-auto
             scrollbar-hide touch-auto"
    >
      {months.map((month, idx) => (
        <button
          key={idx}
          className={`
            relative h-[55px] flex items-center justify-center
            text-[18px] font-normal tracking-[-0.02em] p-2
            ${
              selected === month
                ? "bg-[#090909] text-[#FFF782] rounded-full w-[168px]"
                : "text-[#FAFAF8]"
            }
          `}
          onClick={() => onSelect(month)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};
export default CalendarMonth;
