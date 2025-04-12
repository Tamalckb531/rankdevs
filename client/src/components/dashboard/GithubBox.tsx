import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";

const GithubBox = () => {
  return (
    <Card className=" flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Github Stats</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default GithubBox;
