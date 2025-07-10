import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format, parseISO, isValid } from "date-fns";
import React from "react";
import QnACard from "@/components/UI/QnACard";
import WeeklyCalendar from "@/components/UI/WeeklyCalendar";
import { emotionSmallImageMap } from "@/utils/emotionSmallMap";
import Image from "next/image";

const CalendarDetailPage = () => {
  const router = useRouter();
  const { date, emotion } = router.query;
  const selectedEmotion = typeof emotion === "string" ? emotion : undefined;

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (typeof date === "string") {
      const parsed = parseISO(date);
      if (isValid(parsed)) setSelectedDate(parsed);
    }
  }, [date]);

  const sampleQnA = [
    {
      number: 1,
      question: (
        <>
          오늘 <span className="text-primary">기분</span>이 어땠어요?
        </>
      ),
      answer: selectedEmotion ? (
        <div className="flex flex-col items-center justify-center py-4">
          <Image
            src={emotionSmallImageMap[selectedEmotion].image}
            alt={selectedEmotion}
            width={80}
            height={80}
          />
          <div
            className={`mt-3 text-[18px] font-semibold ${
              emotionSmallImageMap[selectedEmotion]?.color ?? "text-white"
            }`}
          >
            {emotionSmallImageMap[selectedEmotion]?.text ?? "기분 정보 없음"}
          </div>
        </div>
      ) : (
        "기분 정보 없음"
      ),
    },
    {
      number: 2,
      question: (
        <>
          오늘 <span className="text-primary">누구</span>와 함께 시간을
          보냈나요?
        </>
      ),
      answer: "동료 / 오랜만에 직장 동료들을 만났다!",
    },
    {
      number: 3,
      question: (
        <>
          오늘 먹은 식사 중
          <span className="text-primary"> 가장 기억에 남는 음식</span>은
          무엇인가요?
        </>
      ),
      answer: "고기가 너무 맛있었어요. 다음에 또 먹고싶다!",
    },
    {
      number: 4,
      question: (
        <>
          오늘 하루 중
          <span className="text-primary"> 가장 기억에 남는 경험</span>은
          무엇인가요?
        </>
      ),
      answer: "산책중 친구를 만났어요!",
    },
  ];

  return (
    <div className="w-full h-full px-0 pt-[50px] pb-10 text-white bg-background">
      <WeeklyCalendar
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date);
          router.push(`/calendar/${format(date, "yyyy-MM-dd")}`);
        }}
      />

      {sampleQnA.map((item) => (
        <QnACard
          key={item.number}
          number={item.number}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default CalendarDetailPage;
