import React from "react";

const PercentageBar = ({
  title,
  num,
  percentage,
  color,
  colorPercent = "text-secondary",
}: {
  title: string;
  num: number | null;
  percentage: number;
  color: string;
  colorPercent: string | null;
}) => {
  return (
    <div className="lg:w-full">
      <div className="flex justify-between">
        <span className="text-sm">{title}</span>
        <div className={`items-center ${num && "flex justify-between"}`}>
          {num && <span className="mr-2 text-xs text-amber-100">({num})</span>}
          <span className={`${colorPercent} text-sm`}>{percentage}%</span>
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
