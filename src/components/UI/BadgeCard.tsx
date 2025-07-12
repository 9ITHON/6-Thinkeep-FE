import Image from "next/image";
import { badgeImageMap } from "@/utils/badgeImageMap";

interface BadgeCardProps {
  badgeId: number;
  achieved: boolean;
}

const BadgeCard = ({ badgeId, achieved }: BadgeCardProps) => {
  const badge = badgeImageMap[badgeId];

  return (
    <div className={`flex flex-col items-center justify-center rounded-xl`}>
      <Image
        src={achieved ? badge.image : badge.imageGray}
        alt={`badge_${badgeId}`}
        width={148}
        height={95}
      />
    </div>
  );
};

export default BadgeCard;
