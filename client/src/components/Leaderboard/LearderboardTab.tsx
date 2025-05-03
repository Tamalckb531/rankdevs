"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTabStore from "@/store/userTabStore";

const LeaderboardTab = () => {
  const setTab = useTabStore((state) => state.setTab);

  return (
    <Tabs defaultValue="daily">
      <TabsList className=" bg-background">
        <TabsTrigger
          value="daily"
          className="text-lg md:text-xl md:p-5 p-3 py-4 rounded-lg"
          onClick={() => setTab("daily")}
        >
          Daily
        </TabsTrigger>
        <TabsTrigger
          value="weekly"
          className="text-lg md:text-xl md:p-5 p-3 py-4  rounded-lg"
          onClick={() => setTab("weekly")}
        >
          Weekly
        </TabsTrigger>
        <TabsTrigger
          value="monthly"
          className=" text-lg md:text-xl md:p-5 p-3 py-4 rounded-lg"
          onClick={() => setTab("monthly")}
        >
          Monthly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default LeaderboardTab;
