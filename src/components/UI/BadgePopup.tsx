"use client";
import React from "react";
import Image from "next/image";

interface BadgePopupProps {
  badgeImage: string;

  badgeMessage: string;
  onClose: () => void;
}

const BadgePopup = ({
  badgeImage,

  badgeMessage,
  onClose,
}: BadgePopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[300px] h-[350px] bg-gray1 gap-10 rounded-[25px] p-6 flex flex-col items-center justify-center text-white">
        {/* 뱃지 아이콘 */}
        <div className={`flex flex-col items-center justify-center rounded-xl`}>
          <Image src={badgeImage} alt="badge" width={148} height={95} />
        </div>

        {/* 메시지 */}
        <p className="text-center text-[16px] ">{badgeMessage}</p>

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
