import React from "react";
import HeroSection from "./Landing/HeroSection";
import Features from "./Landing/Features";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div className=" flex flex-col gap-2 ">
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
};

export default Landing;
