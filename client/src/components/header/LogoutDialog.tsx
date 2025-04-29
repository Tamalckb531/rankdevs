"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import useUserStore from "@/store/useUserStore";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function LogoutDialog() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-none">
          <LogOut />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to logout from you account ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (!user) return;

              const res = await fetch(`${backendUrl}/api/auth/signout`, {
                method: "POST",
                credentials: "include",
              });

              if (res.ok) {
                setUser(null);
              }

              await signOut({
                callbackUrl: "http://localhost:3000",
                redirect: false,
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
