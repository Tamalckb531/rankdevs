import LeaderboardCardWrapper from "@/components/LeaderboardCardWrapper";
import LeaderboardContent from "@/components/LeaderboardContent";
import LeaderboardTitleBar from "@/components/LeaderboardTitleBar";
import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col md:mx-3 p-2 ">
      <LeaderboardTitleBar />
      <div className=" flex flex-col gap-2 items-center justify-center h-full">
        <LeaderboardCardWrapper />
        <LeaderboardContent />
      </div>
    </div>
  );
};

export default page;
