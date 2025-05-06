import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-[90rem] h-full mt-5 p-3">
      {/* UserProfile */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 h-[300px]">
        <Skeleton className="w-32 h-6 mb-4" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4" />
      </Card>

      {/* TotalStats */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 h-[300px]">
        <Skeleton className="w-24 h-6 mb-4" />
        <Skeleton className="w-full h-10" />
      </Card>

      {/* CPStats */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 h-[300px]">
        <Skeleton className="w-24 h-6 mb-4" />
        <Skeleton className="w-full h-10" />
      </Card>

      {/* GithubBox */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 h-[300px]">
        <Skeleton className="w-28 h-6 mb-4" />
        <Skeleton className="w-full h-8" />
      </Card>

      {/* GithubHeatMap (spans 2 in lg) */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 col-span-1 md:col-span-2 lg:col-span-2 h-[300px]">
        <Skeleton className="w-36 h-6 mb-4" />
        <Skeleton className="w-full h-32" />
      </Card>

      {/* WeeklyStats (spans 2 in lg) */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 h-[300px]">
        <Skeleton className="w-36 h-6 mb-4" />
        <Skeleton className="w-full h-24" />
      </Card>

      {/* YearlyStats (spans 2 in lg) */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 lg:col-span-2 h-[300px]">
        <Skeleton className="w-36 h-6 mb-4" />
        <Skeleton className="w-full h-24" />
      </Card>

      {/* MonthlyStats (spans 3 in lg, 2 in md) */}
      <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2 py-4 col-span-1 md:col-span-2 lg:col-span-3 h-[300px]">
        <Skeleton className="w-40 h-6 mb-4" />
        <Skeleton className="w-full h-40" />
      </Card>
    </div>
  );
}
