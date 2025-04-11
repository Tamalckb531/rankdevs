import { CalendarDays, Mail, MapPin } from "lucide-react";
import React from "react";

const OtherInfo = () => {
  return (
    <div className=" w-full flex items-start gap-2 -mt-4 text-slate-600 dark:text-slate-300">
      <span
        className=" flex items-center justify-center gap-1 text-sm  cursor-pointer"
        title="Chittagong, Bangladesh"
      >
        <MapPin size={18} />
      </span>
      <span
        className=" flex items-center justify-center gap-1 text-sm  cursor-pointer"
        title="ckbtamaldipnew@gmail.com"
      >
        <Mail size={18} />
      </span>

      <span
        className=" flex items-center gap-1 text-sm "
        title="Joined 11th April, 2025"
      >
        <CalendarDays size={18} />
      </span>
    </div>
  );
};

export default OtherInfo;
