"use client";

import Link from "next/link";
import { useNavbar } from "../context/navbar-context";
import {
  Award,
  ChartNoAxesColumnIncreasing,
  House,
  Sword,
  UsersRound,
} from "lucide-react";
import { SiDota2 } from "react-icons/si";
import ToggleSidebar from "../ui/toggle-sidebar";

const Sidebar = () => {
  const { isOpen, toggleIsOpen } = useNavbar();

  return (
    <aside
      className={`${
        isOpen ? "w-72 lg:w-96" : "w-20"
      } fixed top-0 left-0 h-screen overflow-y-auto bg-background-primary border-r border-border-primary transition-all z-40`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className={`border-b border-border-tertiary ${isOpen ? "px-5 py-7" : "py-7 flex justify-center"}`}>
            <div className="flex items-center">
              <SiDota2
                className={`text-primary ${
                  isOpen ? "h-14 w-14 mr-5" : "h-10 w-10"
                }`}
              />
              {isOpen && (
                <div>
                  <h1 className="text-secondary text-2xl font-bold gold-shadow-text">Dota 2</h1>
                  <p className="text-tertiary text-base">Meta Dashboard</p>
                </div>
              )}
            </div>
          </div>

          <nav
            className={`text-text-primary flex flex-col gap-y-5 px-3 py-4 text-base lg:text-xl font-medium ${
              !isOpen ? "items-center" : ""
            }`}
          >
            <Link className="flex items-center gap-5" href="/">
              <House />
              {isOpen && <span>Dashboard</span>}
            </Link>
            <Link className="flex items-center gap-5" href="/heroes">
              <Sword />
              {isOpen && <span>Hero Overview</span>}
            </Link>
            <Link className="flex items-center gap-5" href="/pro-meta">
              <Award />
              {isOpen && <span>Pro Meta</span>}
            </Link>
            <Link className="flex items-center gap-5" href="/tiers">
              <ChartNoAxesColumnIncreasing />
              {isOpen && <span>Tier Analysis</span>}
            </Link>
            <Link className="flex items-center gap-5" href="/recommendations">
              <UsersRound />
              {isOpen && <span>Recommendations</span>}
            </Link>
          </nav>
        </div>

        <div className="border-t border-border-tertiary p-4 md:hidden flex justify-center">
          <ToggleSidebar toggleIsOpen={toggleIsOpen} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
