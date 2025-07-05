import {
  getContrastTextColor,
  getLanguageType,
  languages,
} from "@/lib/language";

interface lang {
  language: string;
  time: string;
}

export const LanguageCard = ({ language, time }: lang) => {
  const langColor = languages[language]?.color || "#454443";
  const textColor = getContrastTextColor(langColor);
  const lang = getLanguageType(language);
  return (
    <div className="relative inline-flex h-fit w-fit overflow-hidden items-center justify-center p-[1px] rounded-full text-nowrap">
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
