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

export default formatDatetime;
