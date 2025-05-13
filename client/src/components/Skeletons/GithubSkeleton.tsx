import { Skeleton } from "@/components/ui/skeleton";
import { CardContent, CardFooter } from "../ui/card";

export const GithubSkeleton = () => {
  return (
    <>
      <CardContent className="flex flex-col gap-2 -mt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="info flex flex-col items-start h-full mt-10 leading-8 gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-40" />
          </div>
          <div className="w-28 h-28 rounded-full mr-5">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
        </div>

        <div className="stat flex items-center justify-between pr-10 mt-4 gap-3">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 justify-center items-center mt-2"
              >
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-start gap-3 -mb-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-5 w-20 rounded-md" />
          ))}
      </CardFooter>
    </>
  );
};
