export const initializeWeeklyStats = () => ({
  sum: { total: 0 },
  sunday: { total: 0 },
  monday: { total: 0 },
  tuesday: { total: 0 },
  wednesday: { total: 0 },
  thursday: { total: 0 },
  friday: { total: 0 },
  saturday: { total: 0 },
});

export const initializeMonthlyStats = (year: number, month: number) => {
  const stats: any = { sum: { total: 0 } };
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) stats[i] = { total: 0 };
  return stats;
};

export const initializeYearlyStats = () => ({
  sum: { total: 0 },
  Jan: { total: 0 },
  Feb: { total: 0 },
  Mar: { total: 0 },
  Apr: { total: 0 },
  May: { total: 0 },
  Jun: { total: 0 },
  Jul: { total: 0 },
  Aug: { total: 0 },
  Sep: { total: 0 },
  Oct: { total: 0 },
  Nov: { total: 0 },
  Dec: { total: 0 },
});

export const initializeStats = (year: number, month: number) => ({
  weeklyStats: initializeWeeklyStats(),
  monthlyStats: initializeMonthlyStats(year, month),
  yearlyStats: initializeYearlyStats(),
  totalStats: { sum: { total: 0 } },
});

export const isNewWeek = (prevDate: Date, today: Date): boolean => {
  const prevMonday = new Date(prevDate);
  prevMonday.setDate(prevMonday.getDate() - prevMonday.getDay() + 1); // Get start of previous week
  const todayMonday = new Date(today);
  todayMonday.setDate(todayMonday.getDate() - todayMonday.getDay() + 1); // Get start of this week
  return prevMonday.getDate() !== todayMonday.getDate();
};

export const sumStats = (existing: any, newData: any) => {
  const result = { ...existing };
  result.total = (existing?.total || 0) + (newData?.total || 0);
  for (const key in newData) {
    if (key !== "total")
      result[key] = (existing[key] || 0) + (newData[key] || 0);
  }
  return result;
};
