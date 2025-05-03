import {
  getContrastTextColor,
  getLanguageType,
  languages,
} from "@/lib/language";
import { Stats } from "@/lib/type";
import React from "react";
import { msToHM } from "@/lib/language";

interface lang {
  language: string;
  time: string;
}

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

const LanguageCard = ({ language, time }: lang) => {
  const langColor = languages[language].color;
  const textColor = getContrastTextColor(langColor);
  const lang = getLanguageType(language);
  return (
    <div className="relative inline-flex h-fit w-fit overflow-hidden items-center justify-center p-[1px] rounded-full">
      {/* Spinning border */}
      <span className="absolute inset-[-1000%] rounded-full animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,theme(colors.black)_0%,theme(colors.white)_50%,theme(colors.black)_100%)]" />

      {/* Actual content with solid background */}
      <div
        className={`relative flex items-center justify-center gap-3 rounded-full px-2 py-1`}
        style={{ backgroundColor: langColor }}
      >
        <p className={`text-md`} style={{ color: textColor }}>
          {lang} - {time}
        </p>
      </div>
    </div>
  );
};
