import { CalendarCardProps } from "@/components/UI/CalendarDayCard";

export const getEmotionByDate = (
  date: Date,
  emotionMap: Record<string, CalendarCardProps["emotion"]>
): CalendarCardProps["emotion"] | undefined => {
  const key = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  return emotionMap[key];
};
