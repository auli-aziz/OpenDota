import React from "react";
import type { HeroStats } from "~/types/heroes";
import RedBadge from "../ui/red-badge";

const MapRedBadge = ({ hero }: { hero: HeroStats }) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {hero.roles.map((role: string) => (
        <RedBadge key={role} role={role} />
      ))}
    </div>
  );
};

export default MapRedBadge;
