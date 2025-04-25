import React from "react";

const DarkBadge = ({ content }: { content: string }) => {
  return (
    <span className="bg-background-primary border-secondary text-secondary rounded-full border-[1px] px-3">
      {content}
    </span>
  );
};

export default DarkBadge;
