import { msToHM } from "@/lib/language";
import React, { useEffect, useState } from "react";

interface info {
  dailyRank: number;
  dailyTotal: number;
  weeklyRank: number;
  weeklyTotal: number;
  monthlyRank: number;
  monthlyTotal: number;
}

const CodingStat = ({
  dailyRank,
  dailyTotal,
  weeklyRank,
  weeklyTotal,
  monthlyRank,
  monthlyTotal,
}: info) => {
  const statGroups = [
    [
      { num: dailyRank + 1, label: "Daily Rank" },
      { num: msToHM(dailyTotal), label: "Last 24 Hours" },
    ],
    [
      { num: weeklyRank + 1, label: "Weekly Rank" },
      { num: msToHM(weeklyTotal), label: "Last 7 Days" },
    ],
    [
      { num: monthlyRank + 1, label: "Monthly Rank" },
      { num: msToHM(monthlyTotal), label: "Last 30 Days" },
    ],
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % statGroups.length);
        setFade(true);
      }, 400); // fade out first, then change

      setTimeout(() => {
        setFade(true); // start fade-in
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [statGroups.length]);

  return (
    <div
      key={index}
      className={`flex w-full items-center justify-around -mt-2 -mb-2 transition-opacity duration-600 ease-in-out ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {statGroups[index].map((stat, i) => (
        <StatCard key={i} num={stat.num} label={stat.label} />
      ))}
    </div>
  );
};

export default CodingStat;

const StatCard = ({ num, label }: { num: number | string; label: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <p className="text-xl font-bold text-amber-400">{num !== -1 ? num : 0}</p>
      <p className="text-sm text-slate-400 font-bold">{label}</p>
    </div>
  );
};
