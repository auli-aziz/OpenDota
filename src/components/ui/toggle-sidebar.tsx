import { PanelLeft } from "lucide-react";
import React from "react";

const ToggleSidebar = ({ toggleIsOpen }: { toggleIsOpen: () => void }) => {
  return (
    <button
      onClick={toggleIsOpen}
      className="hover:bg-secondary hover:text-background-primary border-secondary my-auto flex h-10 w-10 items-center justify-center rounded-xl focus:border-2"
    >
      <PanelLeft className="h-6 w-6" />
    </button>
  );
};

export default ToggleSidebar;
