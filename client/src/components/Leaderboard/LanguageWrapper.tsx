import { Stats } from "@/lib/type";
import React from "react";
import { msToHM } from "@/lib/language";
import { LanguageCard } from "./LanguageCard";

export const LanguageWrapper = ({ stats }: { stats: Stats }) => {
  return (
    <div className=" flex items-center justify-start gap-2">
      {Object.entries(stats)
        .filter(([key]) => key !== "total")
        .map(([language, ms]) => (
          <LanguageCard key={language} language={language} time={msToHM(ms)} />
        ))}
    </div>
  );
};
