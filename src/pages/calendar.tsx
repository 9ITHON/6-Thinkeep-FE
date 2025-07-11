import React, { useState } from "react";
import { format } from "date-fns";
import CalendarDayCard, {
  CalendarCardProps,
} from "../components/UI/CalendarDayCard";
import CalendarMonth from "../components/UI/CalendarMonth";
import Button from "../components/UI/Button";
import Image from "next/image";
import { getCalendarWeeks } from "../utils/Date";
import { getEmotionByDate } from "../utils/emotionUtils";
import { useRouter } from "next/router";

const Calendar = () => {
  // 임시 확인용 데이터
  const mockEmotionMap: Record<string, CalendarCardProps["emotion"]> = {
    "2025-07-01": "happy",
    "2025-07-02": "gloomy",
    "2025-07-03": "angry",
    "2025-07-08": "sad",
  };

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

  const router = useRouter();
  const [selectedEmotion, setSelectedEmotion] =
    useState<CalendarCardProps["emotion"]>();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src="/images/background_img.png"
        alt="배경"
        layout="fill"
        objectFit="cover"
        priority
      />

      <div className="relative z-10 flex flex-col w-full h-full pt-[84px]">
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* 월 표시 헤더 */}
          <div className="flex justify-center items-center h-[56px] w-full relative">
            <Button
              className="flex items-center gap-1 text-[20px] font-semibold text-white tracking-[-0.02em]"
              onClick={() => setIsMonthOpen((prev) => !prev)}
            >
              {selected}
              <Image src="/arrow_down.svg" alt="arrow" width={20} height={20} />
            </Button>

            {isMonthOpen && (
              <CalendarMonth selected={selected} onSelect={handleMonthSelect} />
            )}
          </div>

          <div className="flex flex-col w-full items-center flex-1 rounded-t-[32px] bg-background mt-2">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 w-full text-[18px] font-semibold tracking-[-0.02em] text-white mt-3">
              {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                <div
                  key={day}
                  className={` mt-2 mb-2 text-center ${
                    idx === 0
                      ? "text-red"
                      : idx === 6
                      ? "text-blue"
                      : "text-white"
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
                className="flex gap-2 border-t border-gray2/40 pt-2 pb-2"
              >
                {week.map((day) => {
                  const isThisMonth = day.getMonth() + 1 === month;
                  const emotion = isThisMonth
                    ? getEmotionByDate(day, mockEmotionMap)
                    : undefined;

                  const dateStr = format(day, "yyyy-MM-dd");

                  return (
                    <CalendarDayCard
                      key={day.toISOString()}
                      date={day.getDate()}
                      emotion={emotion}
                      disabled={!isThisMonth}
                      onClick={
                        isThisMonth
                          ? () => {
                              setSelectedEmotion(emotion);
                              router.push({
                                pathname: `/calendar/${dateStr}`,
                                query: { emotion: emotion ?? "" },
                              });
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
