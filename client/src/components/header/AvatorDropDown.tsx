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
export function AvatorDropDown() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
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
