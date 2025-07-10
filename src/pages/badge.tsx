"use client";
import React from "react";
import CircleGraph from "@/components/UI/CircleGraph";
import BadgeCard from "@/components/UI/BadgeCard";
import AppBackground from "@/components/APP/AppBackground";

const badgeGoals = [3, 7, 14, 30];

const getBadgeProgress = (currentDay: number) => {
  let previous = 0;
  for (const goal of badgeGoals) {
    if (currentDay < goal) {
      return {
        current: currentDay - previous,
        total: goal - previous,
      };
    }
    previous = goal;
  }

  return { current: 1, total: 1 };
};

const BadgePage = () => {
  const currentDay = 2;
  const { current, total } = getBadgeProgress(currentDay);

  return (
    <div className="w-full h-screen relative">
      <AppBackground backgroundImage="/images/home_background_img.png">
        <div className="relative z-10 flex flex-col items-center pt-[70px] h-full text-white gap-6">
          <p className="font-semibold text-[32px]">현재 연속 기록</p>

          <CircleGraph
            currentDay={current}
            badgeDay={total}
            textDay={currentDay}
          />

          <p className="font-semibold text-[16px] pb-5">
            당신의 추억을 담아보세요!
          </p>

          <div className="w-[354px] h-[281px] bg-gray1 rounded-[25px] flex flex-col justify-start py-5 px-4 gap-4">
            <p className="text-[20px] font-semibold text-white leading-[26px] pl-3">
              000님의 뱃지
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {badgeGoals.map((goal, idx) => (
                <BadgeCard
                  key={idx}
                  badgeId={idx + 1}
                  achieved={currentDay >= goal}
                />
              ))}
            </div>
          </div>
        </div>
      </AppBackground>
    </div>
  );
};

export default BadgePage;
