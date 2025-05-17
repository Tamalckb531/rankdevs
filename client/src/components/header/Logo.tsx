import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        src="/RDLogo.svg"
        alt="RankDevs Logo"
        width={32}
        height={32}
        priority
      />
      <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
        RankDevs
      </h1>
    </div>
  );
};

export default Logo;
