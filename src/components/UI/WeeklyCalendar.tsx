import React from "react";
import { format, startOfWeek, addDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";

interface WeeklyCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

const WeeklyCalendar = ({
  selectedDate,
  onSelectDate,
}: WeeklyCalendarProps) => {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 }); // 일요일 시작

  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(weekStart, i)
  );

  const router = useRouter();

  return (
    <div className="w-full text-white text-center">
      {/* 상단 월 표시 */}
      <div className="flex items-center justify-start text-[20px] font-semibold pb-5 gap-5 px-5">
        <Image
          src="/arrow_back.svg"
          alt="arrow"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => router.push("/calendar")}
        />
        <span>{format(selectedDate, "M월")}</span>
      </div>

      {/* 요일 및 날짜 */}
      <div className="grid grid-cols-7 text-[18px] font-semibold">
        {dayLabels.map((label, i) => (
          <div
            key={label}
            className={`${
              i === 0 ? "text-red" : i === 6 ? "text-blue" : "text-white"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-2 text-[18px] mb-3 pb-3 border-b-[0.2px] border-gray2">
        {weekDays.map((day, index) => {
          const isSelected =
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          const isSunday = index === 0;
          const isSaturday = index === 6;

          const textColor = isSelected
            ? "text-black"
            : isSunday
            ? "text-red"
            : isSaturday
            ? "text-blue"
            : "text-white";

          return (
            <div
              key={day.toString()}
              className="flex justify-center items-center"
            >
              <button
                className={`w-10 h-10 rounded-full font-semibold ${
                  isSelected ? "bg-primary font-bold" : ""
                } ${textColor}`}
                onClick={() => onSelectDate(day)}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
