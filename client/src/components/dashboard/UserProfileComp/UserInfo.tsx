import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

interface Info {
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  isHireable?: boolean | null | undefined;
  bio?: string | null;
  twitter: string | null | undefined;
  github: string | null | undefined;
}

const UserInfo = ({
  firstname,
  lastname,
  isHireable,
  bio,
  twitter,
  github,
}: Info) => {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex gap-2 items-start">
        <UserImg twitter={twitter} github={github} />
        <div className=" flex flex-col justify-center">
          <div className=" flex items-center justify-center gap-2">
            <p className=" text-xl font-bold">
              {firstname} {lastname}
            </p>
            {isHireable && (
              <Badge className="h-4 px-1 text-xs mt-1">Hireable</Badge>
            )}
          </div>
          {twitter && (
            <a
              href={`https://x.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 text-sm -mt-0.5 cursor-pointer"
            >
              @{twitter}
            </a>
          )}
        </div>
      </div>
      <p className=" text-sm text-slate-600 dark:text-slate-300 pr-14 pl-1">
        {bio}
      </p>
    </div>
  );
};

export default UserInfo;

const UserImg = ({ twitter, github }: Info) => {
  let imageUrl = "/fallback.jpg";

  if (twitter) {
    imageUrl = `https://unavatar.io/twitter/${twitter}`;
  } else if (github) {
    imageUrl = `https://unavatar.io/github/${github}`;
  }

  return (
    <div className="w-[55px] h-[55px]">
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
