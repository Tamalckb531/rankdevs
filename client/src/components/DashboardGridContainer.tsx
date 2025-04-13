import React from "react";
import UserProfile from "./dashboard/UserProfile";
import TotalStats from "./dashboard/TotalStats";
import CPStats from "./dashboard/CPStats";
import GithubBox from "./dashboard/GithubBox";
import GithubHeatMap from "./dashboard/GithubHeatMap";
import WeeklyStats from "./dashboard/WeeklyStats";
import MonthlyStats from "./dashboard/MonthlyStats";
import YearlyStats from "./dashboard/YearlyStats";

const DashboardGridContainer = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-[90rem] h-full mt-5 p-3">
      <UserProfile />
      <TotalStats />
      <CPStats />
      <GithubBox />
      <GithubHeatMap />
      <WeeklyStats />
      <MonthlyStats />
      <YearlyStats />
    </div>
  );
};

export default DashboardGridContainer;
