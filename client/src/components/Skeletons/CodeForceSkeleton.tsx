import { Skeleton } from "@/components/ui/skeleton";

export function CodeForceSkeleton() {
  return (
    <>
      <div className="info-rank flex items-center justify-between">
        {/* Info */}
        <div className="info flex flex-col items-start h-full mt-10 leading-8 gap-2">
          <Skeleton className="h-5 w-32" /> {/* Username */}
          <Skeleton className="h-4 w-40" /> {/* Last Active */}
          <Skeleton className="h-4 w-32" /> {/* Rating */}
          <Skeleton className="h-4 w-32" /> {/* Max Rating */}
        </div>

        {/* Rank */}
        <div className="stat flex flex-col items-center justify-between gap-2 w-[40%] text-lg">
          <Skeleton className="h-6 w-full" /> {/* On Prime */}
          <Skeleton className="h-6 w-full" /> {/* Now */}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="stat flex items-center justify-between mt-4 gap-4">
        <div className="flex flex-col gap-1 justify-center items-center mt-2">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center mt-2">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center mt-2">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </>
  );
}
