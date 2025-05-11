import { Skeleton } from "@/components/ui/skeleton";

const LeetCodeStatsSkeleton = () => {
  return (
    <>
      <div className="info-rank flex items-center justify-between">
        <div className="info flex flex-col items-start h-full mt-10 leading-8 gap-2">
          <Skeleton className="h-5 w-32" /> {/* username */}
          <Skeleton className="h-4 w-48" /> {/* Contest Rating */}
          <Skeleton className="h-4 w-48" /> {/* Global Rank */}
        </div>
        <div className="stat flex items-center justify-between gap-2 flex-wrap w-[50%]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 justify-center items-center w-[47%] mt-1"
            >
              <Skeleton className="h-5 w-10" /> {/* stat number */}
              <Skeleton className="h-4 w-16" /> {/* stat label */}
            </div>
          ))}
        </div>
      </div>

      <div className="total mt-2 flex justify-center items-center gap-2">
        <Skeleton className="h-4 w-20" /> {/* Total */}
        <Skeleton className="h-4 w-8" /> {/* Solved */}
        <Skeleton className="h-4 w-8" /> {/* Total problems */}
      </div>

      <div className="problem-pie-chart flex items-center justify-around mt-2 -mb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-16 rounded-full" />
        ))}
      </div>
    </>
  );
};

export default LeetCodeStatsSkeleton;
