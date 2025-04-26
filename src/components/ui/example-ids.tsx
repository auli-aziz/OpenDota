import { type ReactNode } from "react";

const ExampleIds = ({ children }: { children: ReactNode}) => {
  return (
    <div className="text-text-primary flex items-center md:gap-5 gap-2 overflow-auto flex-col sm:flex-row">
      <span className="text-xs md:text-base">Example IDs:</span>{children}
    </div>
  );
};

export default ExampleIds;
