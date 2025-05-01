"use client";
import React, { useEffect } from "react";
import { InfoForm } from "./InfoForm";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

const InfoWrapper = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full flex items-center justify-center">
        <InfoForm />
      </div>
    </div>
  );
};

export default InfoWrapper;
