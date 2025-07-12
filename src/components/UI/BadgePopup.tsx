"use client";
import React from "react";
import Image from "next/image";
import { badgeImageMap } from "@/utils/badgeImageMap";

interface BadgePopupProps {
  badgeId: number;
  onClose: () => void;
}

const BadgePopup = ({ badgeId, onClose }: BadgePopupProps) => {
  const badge = badgeImageMap[badgeId];

  // 잘못된 badgeId가 들어왔을 경우 방어 처리
  if (!badge) return null;

  const { image, message } = badge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[300px] h-[350px] bg-gray1 rounded-[25px] p-6 flex flex-col items-center justify-center gap-6 text-white">
        {/* 뱃지 아이콘 */}
        <div className="flex flex-col items-center justify-center rounded-xl">
          <Image src={image} alt={`badge_${badgeId}`} width={148} height={95} />
        </div>

        {/* 메시지 */}
        <p className="text-center text-[16px]">{message}</p>

        {/* 확인 버튼 */}
        <button
          className="w-full bg-primary text-black font-bold py-3 rounded-[12px]"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default BadgePopup;
