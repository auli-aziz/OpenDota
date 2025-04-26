import type { ReactNode } from "react";

const Tab = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg bg-background-tertiary flex w-fit justify-between gap-x-1 p-1">
      {children}
    </div>
  );
};

export default Tab;
