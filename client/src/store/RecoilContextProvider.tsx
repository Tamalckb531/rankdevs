"use client";

import { RecoilRoot } from "recoil";
import React from "react";

const RecoilContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilContextProvider;
