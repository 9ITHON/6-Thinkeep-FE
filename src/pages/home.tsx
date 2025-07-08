import React from "react";
import Image from "next/image";

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
  return (
    <div className="relative h-screen w-full overflow-hidden font-[var(--font-family)] text-white">
      <Image
        src="/images/home_background_img.png"
        alt="배경"
        fill
        className="object-cover z-0"
        priority
      />

      <div className="relative z-10 flex flex-col justify-between h-full px-6 pb-[130px] text-center">
        <div className="pt-[115px]">
          <p className="text-[32px] leading-[40px]  font-semibold text-primary tracking-[-0.02em]">
            오늘 당신의 하루는
            <br />
            어땠나요?
          </p>
        </div>

        <div className="flex justify-center">
          <button className="w-[230px] h-[230px] bg-primary text-black rounded-full text-[32px] font-semibold shadow-yellow leading-[26px]">
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
                  className={`text-[18px] leading-[23px] font-medium tracking-[-0.02em] ${
                    i === 5 ? "text-blue" : i === 6 ? "text-red" : "text-white"
                  }`}
                >
                  {days[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
