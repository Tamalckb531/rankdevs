import { getContrastTextColor } from "@/lib/language";

interface RankInfo {
  rank: string;
  color: string;
}

export const LanguageCard = ({ rank, color }: RankInfo) => {
  const textColor = getContrastTextColor(color);
  return (
    <div className="relative inline-flex h-fit w-fit overflow-hidden items-center justify-center p-[1px] rounded-full">
      <span className="absolute inset-[-1000%] rounded-full animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,theme(colors.black)_0%,theme(colors.white)_50%,theme(colors.black)_100%)]" />

      <div
        className={`relative flex items-center justify-center gap-3 rounded-full px-2 py-1`}
        style={{ backgroundColor: color }}
      >
        <p className={`text-md`} style={{ color: textColor }}>
          {rank}
        </p>
      </div>
    </div>
  );
};
