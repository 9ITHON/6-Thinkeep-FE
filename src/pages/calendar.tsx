import React, { useState } from "react";
import { format } from "date-fns";
import CalendarDayCard from "../components/UI/CalendarDayCard";
import CalendarMonth from "../components/UI/CalendarMonth";
import Button from "../components/UI/Button";
import { background_img } from "@/assets";
import Image from "next/image";
import { getCalendarWeeks } from "../util/dateUtils";
import { AppFooter } from "@/components/APP/AppFooter";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const selected = format(currentDate, "yyyy.MM");

  const weeks = getCalendarWeeks(year, month);

  const handleMonthSelect = (monthString: string) => {
    const [y, m] = monthString.split(".").map(Number);
    setCurrentDate(new Date(y, m - 1, 1));
    setIsMonthOpen(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src={background_img}
        alt="배경"
        layout="fill"
        objectFit="cover"
        priority
      />

      <div className="relative z-10 flex flex-col w-full h-full pt-[84px]">
        <div className="flex flex-col w-full flex-1 overflow-hidden">
          {/* 월 표시 헤더 */}
          <div className="flex justify-center items-center h-[56px] w-full relative">
            <Button
              text={`${selected} ▼`}
              className="text-[20px] font-semibold text-white tracking-[-0.02em]"
              onClick={() => setIsMonthOpen((prev) => !prev)}
            />
            {isMonthOpen && (
              <CalendarMonth selected={selected} onSelect={handleMonthSelect} />
            )}
          </div>

          <div className="flex flex-col w-full items-center flex-1  rounded-t-[32px] bg-[#1B1B17] mt-2">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 w-full text-[18px] font-semibold tracking-[-0.02em] text-white mt-3">
              {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                <div
                  key={day}
                  className={` mt-2 mb-2 text-center ${
                    idx === 0
                      ? "text-[#FF7C68]"
                      : idx === 6
                      ? "text-[#85BEFF]"
                      : "text-[#FAFAF8]"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 카드 */}

            {weeks.map((week, weekIdx) => (
              <div
                key={weekIdx}
                className="flex gap-2 border-t border-[#7C7C7C]/40 pt-2 pb-2"
              >
                {week.map((day) => {
                  const isThisMonth = day.getMonth() + 1 === month;
                  const mood = !isThisMonth
                    ? undefined
                    : day.getDate() === 31
                    ? "blue"
                    : day.getDate() === 2
                    ? "yellow"
                    : "disabled";

                  return (
                    <CalendarDayCard
                      key={day.toISOString()}
                      date={day.getDate()}
                      mood={mood}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Calendar;
