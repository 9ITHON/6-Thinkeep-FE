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
import AppBackground from "@/components/APP/AppBackground";
import { useRouter } from "next/router";
import AppFooter from "@/components/APP/AppFooter";

const Calendar = () => {
  const mockEmotionMap: Record<string, CalendarCardProps["emotion"]> = {
    "2025-07-01": "happy",
    "2025-07-02": "gloomy",
    "2025-07-03": "angry",
    "2025-07-08": "sad",
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] =
    useState<CalendarCardProps["emotion"]>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [recordDetail, setRecordDetail] = useState<any | null>(null);

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

  const handleDayClick = async (dateStr: string, isThisMonth: boolean) => {
    if (!isThisMonth) return;
    setSelectedDate(dateStr);
    try {
      const res = await fetch(`http://13.209.69.235:8080/api/records/${dateStr}?userNo=${userNo}`);
      if (res.ok) {
        const data = await res.json();
        setRecordDetail(data);
      } else {
        setRecordDetail(null);
      }
    } catch {
      setRecordDetail(null);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AppBackground backgroundImage="/images/home_background_img.png">
        <div className="relative z-10 flex flex-col w-full h-full pt-[84px]">
          <div className="flex flex-col flex-1 w-full overflow-hidden">
            {/* 월 표시 헤더 */}
            <div className="flex justify-center items-center h-[56px] w-full relative">
              <Button
                className="flex items-center gap-1 text-[20px] font-semibold text-white tracking-[-0.02em]"
                onClick={() => setIsMonthOpen((prev) => !prev)}
              >
                {selected}
                <Image
                  src="/arrow_down.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </Button>

              {isMonthOpen && (
                <CalendarMonth
                  selected={selected}
                  onSelect={handleMonthSelect}
                />
              )}
            </div>

            <div className="flex flex-col w-full items-center flex-1 rounded-t-[32px] bg-background mt-2">
              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 w-full text-[20px] font-semibold tracking-[-0.02em] text-white mt-3">
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
                        onClick={() => handleDayClick(dateStr, isThisMonth)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <AppFooter />
        </div>
      </AppBackground>
      {/* 모달 */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg min-w-[300px]">
            <h2 className="text-lg font-bold mb-2">{selectedDate} 일기</h2>
            {recordDetail ? (
              <div>
                <div>감정: {recordDetail.emotion}</div>
                <div>내용: {recordDetail.answer?.additionalProp1}</div>
              </div>
            ) : (
              <div>일기 없음</div>
            )}
            <button className="mt-4 px-4 py-2 bg-primary rounded" onClick={() => setSelectedDate(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
