"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface Info {
  twitter: string | null | undefined;
  github: string | null | undefined;
}

export function AvatorDropDown() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <RankCardImg
            github={user.githubUserName}
            twitter={user.twitterUsername}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/${user?.githubUserName}`)}
        >
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/info")}>
          change info
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const RankCardImg = ({ github, twitter }: Info) => {
  let imageUrl = "/fallback.jpg";

  if (twitter) {
    imageUrl = `https://unavatar.io/twitter/${twitter}`;
  } else if (github) {
    imageUrl = `https://unavatar.io/github/${github}`;
  }
  return <AvatarImage src={imageUrl} />;
};
