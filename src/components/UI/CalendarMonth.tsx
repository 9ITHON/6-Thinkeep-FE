import React, { useEffect, useRef } from "react";

interface CalendarMonthProps {
  selected: string;
  onSelect: (month: string) => void;
}

const CalendarMonth = ({ selected, onSelect }: CalendarMonthProps) => {
  const months: string[] = [];

  for (let year = 2025; year <= 2026; year++) {
    for (let month = 1; month <= 12; month++) {
      const formatted = `${year}.${month.toString().padStart(2, "0")}`;
      months.push(formatted);
    }
  }

  // 선택된 월에 ref 달기
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, []);

  return (
    <div
      className="absolute w-[200px] left-1/2 top-[64px] -translate-x-1/2
             bg-gray1 shadow-[0px_4px_40px_rgba(0,0,0,0.5)] rounded-[25px]
             flex flex-col items-center py-3 z-50 max-h-[240px] overflow-y-auto
             scrollbar-hide touch-auto"
    >
      {months.map((month, idx) => {
        const isSelected = selected === month;

        return (
          <button
            key={idx}
            ref={isSelected ? selectedRef : null}
            className={`relative h-[55px] flex items-center justify-center
                        text-[18px] font-normal tracking-[-0.02em] p-2
                        ${
                          isSelected
                            ? "bg-black text-primary rounded-full w-[168px]"
                            : "text-white"
                        }`}
            onClick={() => onSelect(month)}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
};

export default CalendarMonth;
