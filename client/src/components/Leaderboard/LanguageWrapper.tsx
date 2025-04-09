import {
  getContrastTextColor,
  getLanguageType,
  languages,
} from "@/lib/language";
import React from "react";

interface lang {
  language: string;
  time: string;
}

export const LanguageWrapper = () => {
  return (
    <div className=" flex items-center justify-start gap-2">
      <LanguageCard language="typescript" time="1H" />
      <LanguageCard language="javascript" time="1H" />
      <LanguageCard language="typescriptreact" time="29M" />
      <LanguageCard language="css" time="2H 31M " />
      <LanguageCard language="prisma" time="35M" />
      <LanguageCard language="dockerfile" time="1H 2M" />
      <LanguageCard language="rust" time="59M" />
      <LanguageCard language="git-commit" time="23M" />
      <LanguageCard language="fortran-modern" time="23M" />
      <LanguageCard language="env" time="1M" />
      <LanguageCard language="tailwindcss" time="45M" />
      <LanguageCard language="jsonc" time="25M" />
      <LanguageCard language="lua" time="25M" />
      <LanguageCard language="terraform" time="25M" />
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
