import { Github, Linkedin, User, X } from "lucide-react";
import React from "react";

interface Info {
  github: string;
  twitter: string;
  porfolio: string;
  peerlist: string;
  linkedIn: string;
}

const LinkDock = ({ github, twitter, porfolio, peerlist, linkedIn }: Info) => {
  return (
    <div className=" flex items-center justify-center gap-10 w-full mt-2">
      <a
        className=" cursor-pointer"
        title="Github"
        href={`https://github.com/${github}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={22} />
      </a>
      <a
        title="X"
        className=" cursor-pointer"
        href={`https://twitter.com/${twitter}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <X size={24} />
      </a>
      <a
        title="Portfolio"
        className=" cursor-pointer"
        href={porfolio}
        target="_blank"
        rel="noopener noreferrer"
      >
        <User size={23} />
      </a>
      <a
        className=" text-lg cursor-pointer font-bold"
        title="Peerlist"
        href={peerlist}
        target="_blank"
        rel="noopener noreferrer"
      >
        P
      </a>
      <a
        className=" text-lg cursor-pointer font-bold"
        title="LinkedIn"
        href={`https://www.linkedin.com/in/${linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin size={20} />
      </a>
    </div>
  );
};

export default LinkDock;
