import React from "react";
import HeroSection from "./Landing/HeroSection";
import Features from "./Landing/Features";
import StartNow from "./Landing/StartNow";

const Landing = () => {
  return (
    <div className=" flex flex-col gap-2 ">
      <HeroSection />
      <Features />
      <StartNow />
    </div>
  );
};

export default Landing;
