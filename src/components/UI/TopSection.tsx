import React from "react";

interface TopSectionProps {
  completionRate: number; // 진행률
  onBackClick?: () => void; // 뒤로가기 버튼 클릭 핸들러
}

export const TopSection = ({
  completionRate,
  onBackClick,
}: TopSectionProps) => {
  const getHeartByRate = (rate: number) => {
    if (rate >= 100) return "❤️";
    return "🤍";
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <button className="text-xl" onClick={onBackClick}>
          🡐
        </button>

        {/* 바 그래프 */}
        <div className="flex-1 h-3 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        {/* 하트 아이콘 */}
        <div className="text-2xl">{getHeartByRate(completionRate)}</div>
      </div>
    </div>
  );
};

export default TopSection;
