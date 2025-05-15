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

interface Info {
  twitter: string | null | undefined;
  github: string | null | undefined;
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

  const github = ls[rank - 1].githubUserName;
  const twitter = ls[rank - 1].twitterUsername;

  return (
    <Card className="bg-transparent border-none flex flex-col items-start w-[250px] shadow-none py-2 relative overflow-hidden">
      <CardHeader className=" w-full">
        <div className="flex items-center justify-around gap-3">
          <RankCardImg github={github} twitter={twitter} />
          <div className="flex flex-col">
            <p className="text-lg font-bold cursor-pointer">{github}</p>
            <p className="text-center text-sm text-slate-400 cursor-pointer">
              {twitter}
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

const RankCardImg = ({ github, twitter }: Info) => {
  let imageUrl = "/fallback.jpg";

  if (twitter) {
    imageUrl = `https://unavatar.io/twitter/${twitter}`;
  } else if (github) {
    imageUrl = `https://unavatar.io/github/${github}`;
  }
  return (
    <div className="w-[45px] h-[45px] mt-2">
      <AspectRatio ratio={3 / 4}>
        <Image
          src={imageUrl}
          alt="User avatar"
          className="rounded-md object-cover"
          width={100}
          height={100}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/fallback.jpg";
          }}
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
