export const isSameDay = (t1: number, t2: number) => {
  const d1 = new Date(t1);
  const d2 = new Date(t2);

  return (
    d1.getFullYear() == d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDate() == d2.getDate()
  );
};
