import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ContactRound,
  Settings2,
  Sparkles,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="bg-zinc-50 mt-5 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center flex flex-col items-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Uplift Yourself
          </h2>
          <p className="mt-4 w-[65%]">
            Get exclusive features — from real-time typing stats to coding
            profiles—everything you need to grow, rank, and stand out as a
            developer.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-2 grid max-w-sm gap-6 *:text-center md:mt-4">
          <Card className="group shadow-zinc-950/5 bg-background border-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Timer className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Time Tracking</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Track every second you code with our VSCode extension—no fluff,
                just real dev time.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5 bg-background border-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Trophy className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Leaderboard</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Compete daily, weekly, and monthly. See where you stand and push
                to the top.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5 bg-background border-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <ContactRound className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Dashboard</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                A job-ready, all-in-one portfolio—live stats, coding profiles,
                and achievements to impress recruiters instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
