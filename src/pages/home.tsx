"use client";

import React, { useEffect, useState } from "react";
import AppBackground from "@/components/APP/AppBackground";
import AppFooter from "@/components/APP/AppFooter";
import { useRouter } from "next/navigation";
import { format, startOfWeek, addDays } from "date-fns";
import { recordApi } from "@/utils/Api/recordApi";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const HomePage = () => {
  const router = useRouter();
  const [emotions, setEmotions] = useState<string[]>(Array(7).fill("empty"));

  useEffect(() => {
    const loadWeeklyRecords = async () => {
      const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // 월요일 시작
      const dates = Array.from({ length: 7 }, (_, i) =>
        format(addDays(start, i), "yyyy-MM-dd")
      );

      const results = await Promise.all(
        dates.map((date) =>
          recordApi
            .getByDate(date)
            .then(() => "filled")
            .catch(() => "empty")
        )
      );

      setEmotions(results);
    };

    loadWeeklyRecords();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden font-[var(--font-family)] text-white">
      <AppBackground backgroundImage="/images/home_background_img.png">
        <div className="relative z-10 flex flex-col justify-between h-full px-6 pb-[130px] text-center">
          <div className="pt-[115px]">
            <p className="text-[32px] leading-[40px] font-semibold text-primary tracking-[-0.02em]">
              오늘 당신의 하루는
              <br />
              어땠나요?
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push("/memory")}
              className="w-[230px] h-[230px] bg-primary text-black rounded-full text-[32px] font-semibold shadow-yellow leading-[26px]"
            >
              추억하기
            </button>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[12px] py-4 px-6 bg-gray1">
            <p className="text-[20px] font-semibold mb-3 text-white tracking-[-0.02em] text-left">
              이번주 일기 기록
            </p>
            <div className="flex items-center justify-center gap-[5px]">
              {emotions.map((status, i) => (
                <div key={i} className="flex flex-col items-center gap-[8px]">
                  <div
                    className={`w-[40px] h-[40px] rounded-full ${
                      status === "filled" ? "bg-primary" : "bg-gray2"
                    }`}
                  />
                  <span
                    className={`text-[20px] leading-[27px] font-medium tracking-[-0.02em] ${
                      i === 6
                        ? "text-red"
                        : i === 0
                        ? "text-blue"
                        : "text-white"
                    }`}
                  >
                    {days[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <AppFooter />
        </div>
      </AppBackground>
    </div>
  );
};

export default HomePage;
