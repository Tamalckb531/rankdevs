import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "@/components/ui/card";

export function YearlyPieChartSkeleton() {
  return (
    <div className="aspect-square lg:h-[200px] h-[180px] -mx-2 lg:mx-0 flex items-center justify-center">
      <Skeleton className="rounded-full h-[150px] w-[150px]" />
    </div>
  );
}

const TopLanguageTipSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-2 w-full ml-5"
        >
          <div className="flex gap-2 items-center">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <Skeleton className="h-4 w-[40px]" />
        </div>
      ))}
    </div>
  );
};

export const YearlyPieChartFullSkeleton = () => {
  return (
    <CardContent className="flex gap-4">
      <YearlyPieChartSkeleton />
      <TopLanguageTipSkeleton />
    </CardContent>
  );
};
