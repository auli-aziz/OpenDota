import React from "react";

const PercentageBar = ({
  title,
  num,
  percentage,
  color
}: {
  title: string;
  num: number;
  percentage: number;
  color: string;
}) => {
  return (
    <div className="lg:w-full">
      <div className="flex justify-between">
        <span className="text-sm font-semibold">{ title }</span>
        <div className="w-24 flex justify-between items-center">
          <span className="text-xs mr-2 text-amber-100">({num})</span>
          <span className="text-secondary">{percentage}%</span>
        </div>
      </div>
      <div className="hero-stat-bar">
        <div
          className={`hero-stat-bar-fill hero-stat-bar-win bg-guardian ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default PercentageBar;
