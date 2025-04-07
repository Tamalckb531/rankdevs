import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Props {
  rank: string;
}

const RankCard = ({ rank }: Props) => {
  return (
    <Card className="bg-background border flex flex-col items-start w-[250px]">
      <CardHeader>
        <div className=" flex items-center justify-between  gap-3">
          <RankCardImg />
          <div className=" flex flex-col">
            <p className=" text-lg font-bold cursor-pointer">TamalCkb531</p>
            <p className=" text-center text-sm text-slate-400 cursor-pointer">
              @TamalCDip
            </p>
          </div>
          <RankSvg />
        </div>
      </CardHeader>
      <CardContent className=" flex flex-col items-center justify-between w-full -mt-5">
        <h1 className=" text-amber-400 text-xl font-bold">10 Hour 29 Minute</h1>
        <h2 className=" text-sm text-slate-400">9+ Language</h2>
      </CardContent>
    </Card>
  );
};

const RankCardImg = () => {
  return (
    <div className="w-[45px] h-[45px]">
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

const RankSvg = () => {
  return (
    <div className="w-[30px] h-full">
      <AspectRatio ratio={3 / 4}>
        <Image
          src="/golden.svg"
          alt="Image"
          className="rounded-md object-cover "
          width={100}
          height={100}
        />
      </AspectRatio>
    </div>
  );
};

export default RankCard;
