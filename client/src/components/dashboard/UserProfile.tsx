import React from "react";
import { Card } from "../ui/card";
import UserInfo from "./UserProfileComp/UserInfo";
import OtherInfo from "./UserProfileComp/OtherInfo";
import CodingStat from "./UserProfileComp/CodingStat";
import LinkDock from "./UserProfileComp/LinkDock";

const UserProfile = () => {
  return (
    <Card className=" bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2">
      <UserInfo />
      <OtherInfo />
      <CodingStat />
      <LinkDock />
    </Card>
  );
};

export default UserProfile;
