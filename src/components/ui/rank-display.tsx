import React from "react";

const RankDisplay = ({ index }: { index: number }) => {
  return (
    <span className="bg-background-primary border-secondary text-secondary rounded-full border-[1px] px-3">
      #{index + 1}
    </span>
  );
};

export default RankDisplay;
