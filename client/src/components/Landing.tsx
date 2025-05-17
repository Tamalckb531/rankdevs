import React from "react";
import HeroSection from "./Landing/HeroSection";
import Features from "./Landing/Features";

const Landing = () => {
  return (
    <div className=" flex flex-col gap-2 ">
      <HeroSection />
      <Features />
    </div>
  );
};

export default Landing;
