import React from "react";

export const LanguageWrapper = () => {
  return (
    <div className=" flex flex-wrap items-end justify-end gap-2">
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
      <LanguageCard />
    </div>
  );
};

const LanguageCard = () => {
  return (
    <div className="flex items-center justify-center gap-3 border border-amber-500 rounded-full dark:bg-amber-300 px-2 py-1">
      <p className=" text-slate-700 text-md">javascript - 45m</p>
    </div>
  );
};
