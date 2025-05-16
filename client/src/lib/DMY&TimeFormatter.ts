const formatDatetime = (input: string | Date) => {
  const date = input instanceof Date ? input : new Date(input);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day} ${month}, ${year} at ${formattedHours}:${minutes} ${period}`;
};

export const getWeekSpan = (timestamp: number | null | undefined): string => {
  if (!timestamp) return "Time data not available";
  const date = new Date(timestamp);
  const day = date.getDay(); // 0 (Sun) to 6 (Sat)
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const format = (d: Date) =>
    `${d.getDate()} ${d.toLocaleString("default", {
      month: "short",
    })}, ${d.getFullYear()}`;

  return `${format(monday)} - ${format(date)}`;
};

export const getYearSpan = (timestamp: number | null | undefined): string => {
  if (!timestamp) return "Time data not available";

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });

  return `Jan, ${year} - ${month}, ${year}`;
};

export default formatDatetime;
