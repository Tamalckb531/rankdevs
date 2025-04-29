"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { User } from "@/lib/type";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status }: any = useSession();
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (status === "authenticated" && session?.user && !user) {
      const sendToBackend = async () => {
        try {
          const githubUserName = session.user.githubUsername;

          const res = await fetch(`${backendUrl}/api/auth/github`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ githubUserName }),
            credentials: "include",
          });

          if (!res.ok) {
            const err = await res.json();
            setError("Sorry! Login failed : " + err);
            setLoading(false);
          }

          const data = await res.json();
          console.log("Data : ", data);

          const newUser: User = {
            id: data.user.id,
            apiKey: data.user.apiKey,
            portfolio: data.user.portfolio,
            githubUserName: data.user.githubUserName,
            email: data.user.email,
            twitterUsername: data.user.twitterUsername,
            linkedIn: data.user.linkedIn,
            peerlistLink: data.user.peerlistLink,
            leetcodeLink: data.user.leetcodeLink,
            codeforcesLink: data.user.codeforcesLink,
          };
          setUser(newUser);

          router.push("/info");
        } catch (err) {
          setError("Error occurred during server login : " + err);
        } finally {
          setLoading(false);
        }
      };

      sendToBackend();
    }
  }, [session, status]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await signIn("github", {
        redirect: false,
        prompt: "consent",
      });

      if (response?.error) setError("Github login failed. Please try again");
    } catch (error) {
      setError("An unexpected error occurred. Please try again");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className=" bg-background">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className=" text-center">
            Login with your Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {error && <div className="text-red-500 text-center">{error}</div>}
              <Button
                variant="default"
                className="w-full"
                onClick={handleLogin}
                disabled={loading || !!user}
              >
                {loading ? (
                  <div className=" flex items-center justify-center gap-2">
                    <Spinner /> <span>Please Wait....</span>
                  </div>
                ) : (
                  <>
                    <Github /> Login with Github
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
