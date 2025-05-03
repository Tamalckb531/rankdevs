import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableRowSkeleton = () => {
  return (
    <TableRow className="border-none py-4 mb-4">
      {/* Rank Index */}
      <TableCell className="font-medium text-lg text-slate-400">
        <Skeleton className="h-6 w-8 rounded-md" />
      </TableCell>

      {/* User Info */}
      <TableCell>
        <div className="flex items-center justify-between gap-2">
          {/* Avatar */}
          <Skeleton className="w-10 h-10 rounded-full" />

          {/* Username & handle */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>
      </TableCell>

      {/* Time */}
      <TableCell className="text-[16px] dark:text-slate-300 font-bold">
        <Skeleton className="h-4 w-24 rounded" />
      </TableCell>

      {/* Language Cards */}
      <TableCell>
        <div className="flex items-center gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-[120px] rounded-full" />
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRowSkeleton;
