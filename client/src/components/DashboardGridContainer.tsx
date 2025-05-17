"use client";
import React, { useEffect } from "react";
import UserProfile from "./dashboard/UserProfile";
import TotalStats from "./dashboard/TotalStats";
import GithubBox from "./dashboard/GithubBox";
import GithubHeatMap from "./dashboard/GithubHeatMap";
import WeeklyStats from "./dashboard/WeeklyStats";
import MonthlyStats from "./dashboard/MonthlyStats";
import YearlyStats from "./dashboard/YearlyStats";
import useDashboard from "@/hooks/useDashboard";
import DashboardSkeleton from "./Skeletons/DashboardSkeleton";
import useDashboardStore from "@/store/useDashboardStore";
import CPStats from "./dashboard/CPStats";
import { useParams } from "next/navigation";

const DashboardGridContainer = () => {
  const { id } = useParams();
  const { mutate, isPending, isError, error } = useDashboard(id as string);
  const dashboard = useDashboardStore((state) => state.dashboard);

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isError)
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center  text-2xl md:text-4xl text-red-400">
        Sorry! User dashboard currently not available
      </div>
    );

  if (!isPending && !dashboard && !isError)
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center  text-2xl md:text-4xl text-blue-400">
        User Data Not Available
      </div>
    );

  return (
    <>
      {!isPending ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-[90rem] h-full mt-5 p-3">
          <UserProfile />
          <TotalStats />
          <CPStats />
          <GithubBox />
          <GithubHeatMap github={dashboard?.githubUserName || ""} />
          <WeeklyStats />
          <YearlyStats />
          <MonthlyStats />
        </div>
      ) : (
        <DashboardSkeleton />
      )}
    </>
  );
};

export default DashboardGridContainer;
