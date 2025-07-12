'use client';
import React, { useEffect, useState } from "react";
import AppBackground from "@/components/APP/AppBackground";
import AppFooter from "@/components/APP/AppFooter";
import { useRouter } from "next/navigation";
import { useCounterStore } from "@/providers/counter-store-provider";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const emotions = [
  "filled",
  "filled",
  "filled",
  "filled",
  "empty",
  "empty",
  "empty",
];

const HomePage = () => {
  const router = useRouter();
  const { userNo } = useCounterStore((state) => state);
  const [hasTodayRecord, setHasTodayRecord] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchTodayStatus = async () => {
      try {
        const res = await fetch(
          `http://13.209.69.235:8080/api/records/today?userNo=${userNo}`
        );
        const data = await res.json();
        setHasTodayRecord(data.hasRecord);
      } catch (e) {
        setHasTodayRecord(e);
      }
    };
    if (userNo) fetchTodayStatus();
  }, [userNo]);

  console.log("현재 사용자 번호:", userNo);

  return (
    <div className="relative h-screen w-full overflow-hidden font-[var(--font-family)] text-white">
      <AppBackground backgroundImage="/images/home_background_img.png">
        <div className="relative z-10 flex flex-col justify-between h-full px-6 pb-[130px] text-center">
          <div className="pt-[115px]">
            <p className="text-[32px] leading-[40px]  font-semibold text-primary tracking-[-0.02em]">
              오늘 당신의 하루는 {userNo}<br />
              <br />
              어땠나요?
            </p>
            {hasTodayRecord === true && (
              <p className="text-[18px] text-blue mt-2">오늘 일기를 이미 작성하셨습니다!</p>
            )}
            {hasTodayRecord === false && (
              <p className="text-[18px] text-primary mt-2">오늘 일기를 아직 작성하지 않았어요!</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push("/memory")}
              className="w-[230px] h-[230px] bg-primary text-black rounded-full text-[32px] font-semibold shadow-yellow leading-[26px]"
              disabled={hasTodayRecord === true}
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
                      i === 5
                        ? "text-blue"
                        : i === 6
                        ? "text-red"
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
