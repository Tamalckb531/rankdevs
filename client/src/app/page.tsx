import { ModeToggle } from "@/components/ToggleBtn";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      Hello <Button className="mt-5 ">Click me</Button>
      <ModeToggle />
    </div>
  );
}
