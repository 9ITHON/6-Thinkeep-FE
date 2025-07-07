import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";

export const getCalendarWeeks = (year: number, month: number) => {
  const start = startOfWeek(startOfMonth(new Date(year, month - 1)), {
    weekStartsOn: 0,
  });
  const end = endOfWeek(endOfMonth(new Date(year, month - 1)), {
    weekStartsOn: 0,
  });

  const weeks: Date[][] = [];
  let current = start;
  let week: Date[] = [];

  while (current <= end) {
    week.push(current);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    current = addDays(current, 1);
  }

  return weeks;
};
