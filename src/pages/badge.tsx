"use client";
import React, { useState, useEffect } from "react";
import CircleGraph from "@/components/UI/CircleGraph";
import BadgeCard from "@/components/UI/BadgeCard";
import BadgePopup from "@/components/UI/BadgePopup";
import AppBackground from "@/components/APP/AppBackground";
import AppFooter from "@/components/APP/AppFooter";

const badgeGoals = [3, 7, 14, 30];

const getBadgeProgress = (currentDay: number) => {
  let previous = 0;
  for (const goal of badgeGoals) {
    if (currentDay <= goal) {
      return {
        current: Math.max(currentDay - previous, 0),
        total: goal - previous,
        justAchieved: currentDay === goal,
        badgeLevel: badgeGoals.indexOf(goal),
      };
    }
    previous = goal;
  }

  return {
    current: 1,
    total: 1,
    justAchieved: false,
    badgeLevel: badgeGoals.length,
  };
};

const badgeData = [
  {
    image: "/badges/badge_1.svg",
    message: "기억루틴, 잘 시작하셨어요!",
  },
  {
    image: "/badges/badge_2.svg",
    message: "매일의 기억이 쌓이고 있어요!",
  },
  {
    image: "/badges/badge_3.svg",
    message: "이제 추억은 당신의 습관입니다!",
  },
  {
    image: "/badges/badge_4.svg",
    message: "추억이 쌓여, 당신만의 이야기가 되었어요. 굉장해요!",
  },
];

const BadgePage = () => {
  const currentDay = 14;
  const { current, total, justAchieved, badgeLevel } =
    getBadgeProgress(currentDay);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (justAchieved) {
      setShowPopup(true);
    }
  }, [justAchieved]);

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

          <div className="w-[354px] h-[363px] bg-gray1 rounded-[25px] flex flex-col justify-start py-5 px-4 gap-4 z-0">
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

      {showPopup && (
        <BadgePopup
          badgeImage={badgeData[badgeLevel].image}
          badgeMessage={badgeData[badgeLevel].message}
          onClose={() => setShowPopup(false)}
        />
      )}
      <AppFooter />
    </div>
  );
};

export default BadgePage;
