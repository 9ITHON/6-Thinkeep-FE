import React from "react";
import Image from "next/image";
import { emotionSmallImageMap } from "@/utils/emotionSmallMap";

export interface CalendarCardProps {
  date: number | string;
  emotion?: "happy" | "good" | "soso" | "gloomy" | "sad" | "angry";
  disabled?: boolean;
  onClick?: () => void;
}

const CalendarDayCard = ({
  date,
  emotion,
  disabled = false,
  onClick,
}: CalendarCardProps) => {
  const backgroundColor = emotion ? "bg-black" : "bg-background";

  return (
    <div
      className={`relative w-[49px] h-[76px] rounded-[7px] flex flex-col items-center justify-start ${backgroundColor} cursor-pointer`}
      onClick={disabled ? undefined : onClick}
    >
      {/* 날짜 텍스트 */}
      <span
        className={`pt-[8px] font-semibold text-[20px] leading-[27px] tracking-[-0.02em] ${
          disabled ? "text-gray2" : "text-white"
        }`}
      >
        {date}
      </span>

      {/* 이모지 이미지 */}
      {emotion && (
        <div className="mt-[6px]">
          <Image
            src={emotionSmallImageMap[emotion].image}
            alt={`${emotion} icon`}
            width={32}
            height={32}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarDayCard;
