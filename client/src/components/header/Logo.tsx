import React from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <h1
      className="text-2xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent cursor-pointer"
      onClick={() => router.push("/")}
    >
      RankDevs
    </h1>
  );
};

export default Logo;
