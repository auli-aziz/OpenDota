import React from "react";

const HeroCardListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="bg-background-tertiary flex animate-pulse overflow-hidden rounded-xl">
        <div className="p-5">
          <div className="bg-background-hover h-full w-[300px] rounded-xl"></div>
        </div>
        <div className="w-[3500px] p-5">
          <div className="bg-background-hover mb-1 h-6 w-64 rounded"></div>
          <div className="bg-background-hover mb-5 h-4 w-24 rounded"></div>
          <div className="bg-background-hover mb-5 h-4 w-5/6 rounded"></div>
          <div className="bg-background-hover h-4 w-3/5 rounded"></div>
        </div>
        <div className="flex w-full gap-2 p-5">
          <div className="bg-background-hover h-6 w-20 rounded"></div>
          <div className="bg-background-hover h-6 w-20 rounded"></div>
        </div>
      </div>
      <div className="bg-background-tertiary flex animate-pulse overflow-hidden rounded-xl">
        <div className="p-5">
          <div className="bg-background-hover h-full w-[300px] rounded-xl"></div>
        </div>
        <div className="w-[3500px] p-5">
          <div className="bg-background-hover mb-1 h-6 w-64 rounded"></div>
          <div className="bg-background-hover mb-5 h-4 w-24 rounded"></div>
          <div className="bg-background-hover mb-5 h-4 w-5/6 rounded"></div>
          <div className="bg-background-hover h-4 w-3/5 rounded"></div>
        </div>
        <div className="flex w-full gap-2 p-5">
          <div className="bg-background-hover h-6 w-20 rounded"></div>
          <div className="bg-background-hover h-6 w-20 rounded"></div>
        </div>
      </div>
      <div className="bg-background-tertiary flex animate-pulse overflow-hidden rounded-xl">
        <div className="p-5">
          <div className="bg-background-hover h-full w-[300px] rounded-xl"></div>
        </div>
        <div className="w-[3500px] p-5">
          <div className="bg-background-hover mb-1 h-6 w-64 rounded"></div>
          <div className="bg-background-hover mb-5 h-4 w-24 rounded"></div>
          <div className="bg-background-hover mb-5 h-4 w-5/6 rounded"></div>
          <div className="bg-background-hover h-4 w-3/5 rounded"></div>
        </div>
        <div className="flex w-full gap-2 p-5">
          <div className="bg-background-hover h-6 w-20 rounded"></div>
          <div className="bg-background-hover h-6 w-20 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroCardListSkeleton;
