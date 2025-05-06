import DashboardGridContainer from "@/components/DashboardGridContainer";
import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";
import React from "react";

const page = () => {
  return (
    <div className=" flex items-center justify-center">
      {/* <DashboardGridContainer /> */}
      <DashboardSkeleton />
    </div>
  );
};

export default page;
