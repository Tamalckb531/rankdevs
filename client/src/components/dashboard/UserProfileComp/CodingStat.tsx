import React from "react";

interface stat {
  time: string;
  label: string;
}

const CodingStat = () => {
  return (
    <div className="flex w-full items-center justify-around -mt-2 -mb-2">
      <StatCard time="7H 29M" label="Last 24 hour" />
      <StatCard time="89H 26M" label="All time" />
    </div>
  );
};

export default CodingStat;

const StatCard = ({ time, label }: stat) => {
  return (
    <div className=" flex flex-col justify-center items-center gap-1">
      <p className=" text-xl font-bold text-amber-400"> {time}</p>
      <p className=" text-sm text-slate-400 font-bold"> {label} </p>
    </div>
  );
};
