import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className=" flex justify-between p-5 mx-5 items-center">
      <div className=" flex flex-col gap-2  justify-center">
        <Logo />
        <p className="text-sm">© 2025 RankDevs, All rights reserved</p>
      </div>
      <div className=" hidden md:block text-sm text-accent-foreground text-wrap">
        Facing an issue or have a feature request? Tag us on
        <a
          href={`https://x.com/rankdevs`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 text-base italic underline -mt-0.5 cursor-pointer ml-1"
        >
          twitter
        </a>
        —we’re listening!
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
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

export default Footer;
