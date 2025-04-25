import React from "react";

const StatDisplay = ({ num, color, name }: { num: number; color: string; name: string}) => {
  return (
    <div className="flex h-full w-full min-w-16 flex-col items-center justify-center">
      <div className="text-text-primary text-sm">{name}</div>
      <p className={`${color} text-2xl lg:text-3xl font-bold`}>
        {num}
      </p>
    </div>
  );
};

export default StatDisplay;
