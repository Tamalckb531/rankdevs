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
import { signIn } from "next-auth/react";
import { useState } from "react";
import Spinner from "./Spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await signIn("github", { redirect: false });

      if (response?.error) setError("Failed to login. Please try again");
    } catch (error) {
      setError("An unexpected error occurred. Please try again");
    } finally {
      setLoading(false);
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
                disabled={loading}
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
