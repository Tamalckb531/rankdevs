import React from "react";
import { DataTable } from "./Leaderboard/DataTable";
import { Status } from "@/lib/type";

const LeaderboardContent = ({ isPending, isError, error }: Status) => {
  return (
    <div className="w-full lg:w-[80rem] h-full mt-8">
      <DataTable isPending={isPending} isError={isError} error={error} />
    </div>
  );
};

export default LeaderboardContent;
