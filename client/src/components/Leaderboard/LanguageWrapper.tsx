import React from "react";

export const LanguageWrapper = () => {
  return (
    <div className=" flex flex-wrap items-end justify-end gap-2">
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
    </div>
  );
};

const LanguageCard = () => {
  return (
    <div className="relative inline-flex h-fit w-fit overflow-hidden items-center justify-center p-[2.5px] rounded-full">
      {/* Spinning border */}
      <span className="absolute inset-[-1000%] rounded-full animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,theme(colors.amber.500)_0%,theme(colors.amber.700)_50%,theme(colors.white)_100%)]" />

      {/* Actual content with solid background */}
      <div className="relative flex items-center justify-center gap-3 rounded-full dark:bg-amber-300 bg-amber-200 px-2 py-1">
        <p className="text-slate-700 text-md">javascript - 45m</p>
      </div>
    </div>
  );
};
