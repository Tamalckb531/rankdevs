import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTheme } from "next-themes";

interface Info {
  github: string;
}

const GithubHeatMap = ({ github }: Info) => {
  const { theme } = useTheme();
  if (!github)
    return (
      <Card className="flex md:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 items-center justify-center md:text-2xl text-lg text-blue-400">
        No Github Username Found :)
      </Card>
    );

  return (
    <Card className="flex flex-col md:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Github Heatmap</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col items-center justify-center h-full">
        <GitHubCalendar
          username={github}
          blockRadius={15}
          colorScheme={theme === "dark" ? "dark" : "light"}
          renderBlock={(block, activity) => {
            return React.cloneElement(block, {
              ...block.props,
              children: (
                <title>
                  {activity.count} contribution{activity.count !== 1 ? "s" : ""}{" "}
                  on {new Date(activity.date).toDateString()}
                </title>
              ),
            });
          }}
        />
      </CardContent>
    </Card>
  );
};

export default GithubHeatMap;
