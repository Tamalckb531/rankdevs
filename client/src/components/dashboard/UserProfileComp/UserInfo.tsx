import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

const UserInfo = () => {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex gap-2 items-start">
        <UserImg />
        <div className=" flex flex-col justify-center">
          <div className=" flex items-center justify-center gap-2">
            <p className=" text-xl font-bold">Tamal Chakraborty</p>
            <Badge className="h-4 px-1 text-xs mt-1">Hireable</Badge>
          </div>
          <p className=" text-slate-400 text-sm -mt-0.5">@TamalCDip</p>
        </div>
      </div>
      <p className=" text-sm text-slate-300">
        To confuse your enemy, confuse yourself first ~ Sun Tzu
      </p>
    </div>
  );
};

export default UserInfo;

const UserImg = () => {
  return (
    <div className="w-[55px] h-[55px]">
      <AspectRatio ratio={3 / 4}>
        <Image
          src="/ghibili.jpg"
          alt="Image"
          className="rounded-md object-cover"
          width={100}
          height={100}
        />
      </AspectRatio>
    </div>
  );
};
