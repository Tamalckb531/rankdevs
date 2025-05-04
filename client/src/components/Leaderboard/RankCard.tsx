import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useLSSTore from "@/store/useLeaderboardStatsStore";
import RankCardSkeleton from "../Skeletons/RankCardSkeleton";
import { countLanguages, msToHM } from "@/lib/language";

interface Props {
  rank: number;
}

const RankCard = ({ rank }: Props) => {
  let color, img;

  if (rank === 1) {
    color = "text-amber-400";
    img = "/golden.svg";
  } else if (rank === 2) {
    color = "text-sky-400";
    img = "/silver.svg";
  } else {
    color = "text-red-400";
    img = "/bronze.svg";
  }

  const ls = useLSSTore((state) => state.ls);

  if (!ls[rank - 1]) return <RankCardSkeleton />;

  return (
    <Card className="bg-transparent border-none flex flex-col items-start w-[250px] shadow-none py-2 relative overflow-hidden">
      <CardHeader className=" w-full">
        <div className="flex items-center justify-around gap-3">
          <RankCardImg />
          <div className="flex flex-col">
            <p className="text-lg font-bold cursor-pointer">
              {ls[rank - 1].githubUserName}
            </p>
            <p className="text-center text-sm text-slate-400 cursor-pointer">
              {ls[rank - 1].twitterUsername}
            </p>
          </div>
          <RankSvg img={img} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between w-full -mt-5">
        <h1 className={`${color} text-xl font-bold`}>
          {msToHM(ls[rank - 1].Stats.total)}
        </h1>
        <h2 className="text-sm text-slate-400">
          {countLanguages(ls[rank - 1].Stats)} Languages
        </h2>
      </CardContent>
    </Card>
  );
};

const RankCardImg = () => {
  return (
    <div className="w-[45px] h-[45px] mt-2">
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

const RankSvg = ({ img }: { img: string }) => {
  return (
    <div className="w-[30px] h-full">
      <AspectRatio ratio={3 / 4}>
        <Image
          src={`${img}`}
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
