import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LeaderboardTab = () => {
  return (
    <Tabs defaultValue="daily">
      <TabsList className=" bg-background">
        <TabsTrigger
          value="daily"
          className="text-lg md:text-xl md:p-5 p-3 py-4 rounded-lg"
        >
          Daily
        </TabsTrigger>
        <TabsTrigger
          value="weekly"
          className="text-lg md:text-xl md:p-5 p-3 py-4  rounded-lg"
        >
          Weekly
        </TabsTrigger>
        <TabsTrigger
          value="monthly"
          className=" text-lg md:text-xl md:p-5 p-3 py-4 rounded-lg"
        >
          Monthly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default LeaderboardTab;
