import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const RankCardSkeleton = () => {
  return (
    <Card className="bg-transparent border-none flex flex-col items-start w-[250px] shadow-none p-0 relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between gap-3 animate-pulse">
          <div className="w-[45px] h-[45px] rounded-md bg-slate-700" />
          <div className="flex flex-col gap-1">
            <div className="w-[100px] h-[15px] bg-slate-700 rounded" />
            <div className="w-[70px] h-[12px] bg-slate-600 rounded" />
          </div>
          <div className="w-[30px] h-[40px] rounded-md bg-slate-700" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between w-full -mt-5 animate-pulse gap-2">
        <div className="w-[120px] h-[20px] rounded bg-slate-700" />
        <div className="w-[90px] h-[14px] rounded bg-slate-600" />
      </CardContent>
    </Card>
  );
};

export default RankCardSkeleton;
