"use client";
import React from "react";
import { Card } from "../ui/card";
import UserInfo from "./UserProfileComp/UserInfo";
import OtherInfo from "./UserProfileComp/OtherInfo";
import CodingStat from "./UserProfileComp/CodingStat";
import LinkDock from "./UserProfileComp/LinkDock";
import useDashboardStore from "@/store/useDashboardStore";

const UserProfile = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);

  return (
    <Card className=" bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2">
      <UserInfo
        twitter={dashboard?.twitterUsername}
        github={dashboard?.githubUserName}
      />
      <OtherInfo email={dashboard?.email} joinAt={dashboard?.joinAt} />
      <CodingStat
        dailyRank={dashboard?.dailyRank ?? -1}
        weeklyRank={dashboard?.weeklyRank ?? -1}
        monthlyRank={dashboard?.monthlyRank ?? -1}
        dailyTotal={dashboard?.dailyTotal || 0}
        weeklyTotal={dashboard?.weeklyTotal || 0}
        monthlyTotal={dashboard?.monthlyTotal || 0}
      />
      <LinkDock
        github={dashboard?.githubUserName || ""}
        twitter={dashboard?.twitterUsername || ""}
        peerlist={dashboard?.peerlistLink || ""}
        porfolio={dashboard?.portfolio || ""}
        linkedIn={dashboard?.linkedIn || ""}
      />
    </Card>
  );
};

export default UserProfile;
