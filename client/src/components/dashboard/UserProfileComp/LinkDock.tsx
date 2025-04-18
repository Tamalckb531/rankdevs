import { Github, User, X } from "lucide-react";
import React from "react";

const LinkDock = () => {
  return (
    <div className=" flex items-center justify-center gap-10 w-full mt-2">
      <span className=" cursor-pointer" title="Github">
        <Github size={22} />
      </span>
      <span title="X" className=" cursor-pointer">
        <X size={24} />
      </span>
      <span title="Portfolio" className=" cursor-pointer">
        <User size={23} />
      </span>
      <span className=" text-lg cursor-pointer" title="Peerlist">
        P
      </span>
    </div>
  );
};

export default LinkDock;
