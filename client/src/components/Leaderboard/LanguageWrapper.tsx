import { Stats } from "@/lib/type";
import React from "react";
import { msToHM } from "@/lib/language";
import { LanguageCard } from "./LanguageCard";
import { Ellipsis } from "lucide-react";

export const LanguageWrapper = ({ stats }: { stats: Stats }) => {
  return (
    <div className=" flex items-center justify-start gap-2">
      {Object.entries(stats)
        .filter(([key]) => key !== "total")
        .slice(0, 5)
        .map(([language, ms]) => (
          <LanguageCard key={language} language={language} time={msToHM(ms)} />
        ))}
      <div
        title="See all"
        className=" cursor-pointer hover:border border-red-300 rounded-full"
      >
        <Ellipsis />
      </div>
    </div>
  );
};
