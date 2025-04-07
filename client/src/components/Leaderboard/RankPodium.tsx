import React from "react";

const RankPodium = () => {
  const heights = {
    1: "h-[220px]",
    2: "h-[180px]",
    3: "h-[160px]",
  };
  return (
    <div className="relative">
      <div className={`${heights[1]} w-48 relative`}>
        {/* Main body */}
        <div className="absolute inset-0 bg-[#0d2756] rounded-t-lg overflow-hidden">
          {/* Text on front face */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#1e3c6e] text-6xl font-bold">
              {/* {rank.position === 1 && "1st"}
                        {rank.position === 2 && "2nd"}
                        {rank.position === 3 && "3rd"} */}
              1st
            </div>
          </div>

          {/* Bottom blend */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#061224] to-transparent"></div>

          {/* Top surface based exactly on the image */}
          <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
            {/* Main top surface */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#133366] rounded-t-lg">
              {/* Subtle inner shadow to create inset effect */}
              <div className="absolute inset-0 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] rounded-t-lg"></div>

              {/* Very subtle highlight at the front edge */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1a3a6d] opacity-50"></div>
            </div>

            {/* Subtle gradient to blend with main body */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#0d2756] to-[#133366]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankPodium;
