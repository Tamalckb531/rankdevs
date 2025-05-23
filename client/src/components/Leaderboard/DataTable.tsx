"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LanguageWrapper } from "./LanguageWrapper";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TableRowSkeleton from "../Skeletons/TableRowSkeleton";
import useLSSTore from "@/store/useLeaderboardStatsStore";
import { msToHM } from "@/lib/language";
import { Status, userInfo } from "@/lib/type";
import { useRouter } from "next/navigation";

export function DataTable({ isPending, isError, error }: Status) {
  const ls = useLSSTore((state) => state.ls);

  return (
    <div className="w-full rounded-md border shadow-md dark:shadow-amber-50">
      <ScrollArea className=" w-full rounded-md">
        <Table className="border-separate border-spacing-y-2 w-full px-2">
          <TableHeader>
            <TableRow className=" font-bold text-lg border-b border-slate-400">
              <TableHead className="w-[100px] min-w-[100px]">#Rank</TableHead>
              <TableHead className="w-[160px] min-w-[160px]">Info</TableHead>
              <TableHead className="w-[120px] min-w-[120px]">Time</TableHead>
              <TableHead>Language</TableHead>
            </TableRow>
            <TableRow className=" hover:bg-background h-0 w-full">
              <TableHead colSpan={4} className="p-0 h-0">
                <div className="border-b border-muted w-full h-[1px]"></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ls.length > 0 &&
              !isError &&
              !isPending &&
              ls.map((data, Index) => (
                <TableRow key={data.id} className=" border-none py-4 mb-4">
                  <TableCell className="font-medium text-lg text-slate-400">
                    {Index + 1}
                  </TableCell>
                  <TableCell>
                    <UserInfo
                      githubUserName={data.githubUserName}
                      twitterUsername={data.twitterUsername}
                    />
                  </TableCell>
                  <TableCell className="text-[16px] dark:text-slate-300 font-bold ">
                    {msToHM(data.Stats.total)}
                  </TableCell>
                  <TableCell>
                    <LanguageWrapper stats={data.Stats} />
                  </TableCell>
                </TableRow>
              ))}
            {isPending &&
              Array.from({ length: 10 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
          </TableBody>
        </Table>
        {!isPending && !isError && ls.length == 0 && (
          <div className=" p-5 md:text-xl text-lg text-center">
            No Data to show right now :)
          </div>
        )}
        {isError && !isPending && (
          <div className=" p-5 md:text-xl text-lg text-center text-red-400">
            Some Issue in the server : {error?.message}
          </div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
const UserInfo = ({ githubUserName, twitterUsername }: userInfo) => {
  const router = useRouter();
  return (
    <div className=" flex items-start justify-start gap-2">
      <RankCardImg
        githubUserName={githubUserName}
        twitterUsername={twitterUsername}
      />
      <div className="flex flex-col">
        <p
          className=" text-[15px] font-bold cursor-pointer"
          onClick={() => router.push(`/${githubUserName}`)}
        >
          {githubUserName}
        </p>
        {twitterUsername && (
          <a
            className=" text-xs text-slate-400 cursor-pointer"
            href={`https://twitter.com/${twitterUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {twitterUsername}
          </a>
        )}
      </div>
    </div>
  );
};

const RankCardImg = ({ githubUserName, twitterUsername }: userInfo) => {
  let imageUrl = "/fallback.jpg";

  if (twitterUsername) {
    imageUrl = `https://unavatar.io/twitter/${twitterUsername}`;
  } else if (githubUserName) {
    imageUrl = `https://unavatar.io/github/${githubUserName}`;
  }
  return (
    <Avatar className="w-10 h-10">
      <AvatarImage
        src={imageUrl}
        alt="Image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/fallback.jpg";
        }}
      />
      <AvatarFallback>DP</AvatarFallback>
    </Avatar>
  );
};
