"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LanguageWrapper } from "./LanguageWrapper";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TableRowSkeleton from "../Skeletons/TableRowSkeleton";
import useLeaderboard from "@/hooks/useLeaderboard";
import useLSSTore from "@/store/useLeaderboardStatsStore";

export function DataTable() {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  const { isPending, isError, error } = useLeaderboard();
  const ls = useLSSTore((state) => state.ls);

  return (
    <div className="w-full rounded-md border shadow-md dark:shadow-amber-50">
      <ScrollArea className=" w-full rounded-md">
        <Table className="border-separate border-spacing-y-2 w-full px-2">
          <TableHeader>
            <TableRow className=" font-bold text-lg border-b border-slate-400">
              <TableHead className="w-[100px] min-w-[100px]">#Rank</TableHead>
              <TableHead className="w-[160px] min-w-[160px]">Info</TableHead>
              <TableHead className="w-[120px] min-w-[120px]">Time</TableHead>
              <TableHead>Language</TableHead>
            </TableRow>
            <TableRow className=" hover:bg-background h-0 w-full">
              <TableHead colSpan={4} className="p-0 h-0">
                <div className="border-b border-muted w-full h-[1px]"></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ls.length > 0 &&
              ls.map((data, Index) => (
                <TableRow key={data.id} className=" border-none py-4 mb-4">
                  <TableCell className="font-medium text-lg text-slate-400">
                    {Index}
                  </TableCell>
                  <TableCell>
                    <UserInfo />
                  </TableCell>
                  <TableCell className="text-[16px] dark:text-slate-300 font-bold ">
                    {data.Stats.total}
                  </TableCell>
                  <TableCell>
                    <LanguageWrapper />
                  </TableCell>
                </TableRow>
              ))}
            {isPending &&
              Array.from({ length: 10 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
          </TableBody>
        </Table>
        {!isPending && !isError && ls.length == 0 && (
          <div className=" p-5 md:text-xl text-lg text-center">
            No Data to show right now :)
          </div>
        )}
        {isError && !isPending && (
          <div className=" p-5 md:text-xl text-lg text-center text-red-400">
            Error encountered during fetching the data
          </div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
const UserInfo = () => {
  return (
    <div className=" flex items-center justify-between">
      <RankCardImg />
      <div className="flex flex-col">
        <p className=" text-[15px] font-bold cursor-pointer">TamalCkb531</p>
        <p className="text-center text-xs text-slate-400 cursor-pointer">
          @TamalCDip
        </p>
      </div>
    </div>
  );
};

const RankCardImg = () => {
  return (
    <Avatar className="w-10 h-10">
      <AvatarImage src="/ghibili.jpg" alt="Image" />
      <AvatarFallback>DP</AvatarFallback>
    </Avatar>
  );
};
