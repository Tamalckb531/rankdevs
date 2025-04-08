import React from "react";

const RankPodium = ({ position = 1 }: any) => {
  const heights: any = {
    1: "h-[180px]",
    2: "h-[120px]",
    3: "h-[100px]",
  };

  return (
    <div className="relative">
      <div className={`w-60 relative ${heights[position]}`}>
        {/* Top Trapezoid Div */}
        <div className="absolute top-0 left-0 w-full h-6 ">
          <svg
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="topGradientLight" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#d1d5db" /> {/* neutral-300 */}
                <stop offset="100%" stopColor="#ffffff" /> {/* white */}
              </linearGradient>
              <linearGradient id="topGradientDark" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1f2937" /> {/* neutral-800 */}
                <stop offset="100%" stopColor="#0f172a" /> {/* neutral-900 */}
              </linearGradient>
            </defs>

            {/* Light mode */}
            <polygon
              points="20,0 80,0 100,20 0,20"
              fill="url(#topGradientLight)"
              className="dark:hidden"
            />
            {/* Dark mode */}
            <polygon
              points="20,0 80,0 100,20 0,20"
              fill="url(#topGradientDark)"
              className="hidden dark:block"
            />
          </svg>
        </div>

        {/* Main Body */}
        <div className="absolute inset-0 top-6 bg-background border-x border-t border-neutral-300 dark:border-neutral-600 overflow-hidden">
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-black to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              {position === 1 && "1st"}
              {position === 2 && "2nd"}
              {position === 3 && "3rd"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankPodium;
