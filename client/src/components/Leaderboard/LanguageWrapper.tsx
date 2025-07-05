import { Stats } from "@/lib/type";
import React from "react";
import { msToHM } from "@/lib/language";
import { LanguageCard } from "./LanguageCard";
import { Ellipsis } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const LanguageWrapper = ({ stats }: { stats: Stats }) => {
  return (
    <div className=" flex items-center justify-start gap-2">
      {Object.entries(stats)
        .filter(([key]) => key !== "total")
        .slice(0, 5)
        .map(([language, ms]) => (
          <LanguageCard key={language} language={language} time={msToHM(ms)} />
        ))}
      <Drawer>
        <DrawerTrigger>
          <div
            title="See all"
            className=" cursor-pointer hover:border border-red-300 rounded-full"
          >
            <Ellipsis />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>All Languages with time</DrawerTitle>
            <div className=" flex flex-wrap m-2 p-2 items-start justify-start gap-2 w-full">
              {Object.entries(stats)
                .filter(([key]) => key !== "total")
                .map(([language, ms]) => (
                  <LanguageCard
                    key={language}
                    language={language}
                    time={msToHM(ms)}
                  />
                ))}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
