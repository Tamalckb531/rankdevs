import React from "react";
import { InfoForm } from "./InfoForm";

const InfoWrapper = () => {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full flex items-center justify-center">
        <InfoForm />
      </div>
    </div>
  );
};

export default InfoWrapper;
