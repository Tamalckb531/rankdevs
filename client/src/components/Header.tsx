"use client";
import React from "react";
import Logo from "./header/Logo";
import { ModeToggle } from "./header/ToggleBtn";
import { Trophy } from "lucide-react";
import { AvatorDropDown } from "./header/AvatorDropDown";
import { useRouter } from "next/navigation";
import Login from "./LoginButton";
import { LogoutDialog } from "./header/LogoutDialog";
import useUserStore from "@/store/useUserStore";

const Header = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return (
    <div className=" flex items-center justify-between p-2 mt-1 md:mx-3 relative z-50">
      <div className=" logo flex justify-start items-center">
        <Logo />
      </div>
      <nav className=" nav flex items-center justify-between gap-3">
        <div
          className=" hover:dark:bg-[#1B1B1D] hover:bg-gray-100 p-2 rounded-md transition-colors duration-300"
          title="Leaderboard"
          onClick={() => router.push("/leaderboard")}
        >
          <Trophy size={20} />
        </div>
        <ModeToggle />
        {user ? (
          <>
            <AvatorDropDown />
            <LogoutDialog />
          </>
        ) : (
          <>
            <Login />{" "}
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
