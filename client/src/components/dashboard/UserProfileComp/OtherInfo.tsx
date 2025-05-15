import formatDatetime from "@/lib/DMY&TimeFormatter";
import { CalendarDays, Mail, MapPin } from "lucide-react";
import React from "react";

interface Info {
  email: string | null | undefined;
  joinAt: Date | undefined;
  location: string | null | undefined;
}

const OtherInfo = ({ email, joinAt, location }: Info) => {
  const date = joinAt ? formatDatetime(joinAt) : "";

  return (
    <div className=" w-full flex items-start gap-2 -mt-5 text-slate-600 dark:text-slate-300">
      <span
        className=" flex items-center justify-center gap-1 text-sm  cursor-pointer"
        title={location || ""}
      >
        <MapPin size={18} />
      </span>

      <a
        href={`https://mail.google.com/mail/?view=cm&to=${email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 text-sm cursor-pointer"
        title={`${email}`}
      >
        <Mail size={18} />
      </a>

      <span className=" flex items-center gap-1 text-sm " title={`${date}`}>
        <CalendarDays size={18} />
      </span>
    </div>
  );
};

export default OtherInfo;
