"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface NavBarInterface {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const NavbarContext = createContext<NavBarInterface | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <NavbarContext.Provider value={{isOpen, toggleIsOpen}}>
      {children}
    </NavbarContext.Provider>
  )
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};