"use client";

import { useNavbar } from "../context/navbar-context";
import ToggleSidebar from "../ui/toggle-sidebar";

const DashboardHeader = () => {
  const { isOpen, toggleIsOpen } = useNavbar();

  return (
    <header
      className={`fixed top-0 z-30 flex h-20 items-center justify-between border-b border-border-secondary bg-gradient-to-r from-background-primary via-primary to-background-primary px-4 md:px-8 transition-all w-full ${
        isOpen ? "md:ml-72 lg:ml-96" : "md:ml-20"
      }`}
    >
      <div className="hidden md:block">
        <ToggleSidebar toggleIsOpen={toggleIsOpen} />
      </div>
    </header>
  );
};

export default DashboardHeader;
