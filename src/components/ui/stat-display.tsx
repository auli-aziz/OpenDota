import React from "react";

const StatDisplay = ({ num, color }: { num: number; color: string}) => {
  return (
    <div className="flex h-full w-full min-w-16 flex-col items-center justify-center">
      <div className="text-text-primary text-sm">Picks</div>
      <p className={`${color} text-2xl font-bold`}>
        {num}
      </p>
    </div>
  );
};

export default StatDisplay;
