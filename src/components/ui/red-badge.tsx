import React from "react";

const RedBadge = ({ role }: { role: string }) => {
  return (
    <span
      key={role}
      className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
    >
      {role}
    </span>
  );
};

export default RedBadge;
