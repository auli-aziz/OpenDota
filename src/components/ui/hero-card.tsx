import Image from "next/image";
import AttributesTag from "./attributes-tag";
import type { HeroStats } from "~/types/heroes";
import type { ReactNode } from "react";

const HeroCard = ({
  hero,
  tag,
  footer,
}: {
  hero: HeroStats;
  tag?: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <div className="border-border-primary group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-sm hover:shadow-amber-200">
      {tag && (
        <div className="absolute top-3 right-2.5 z-10">{tag}</div>
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <AttributesTag primary_att={hero.primary_attr} />

      <div className="h-60 w-full overflow-hidden">
        {hero.img && (
          <Image
            src={`https://cdn.cloudflare.steamstatic.com${hero.img}`}
            alt={hero.name || `Hero ${hero.id}`}
            width={300}
            height={170}
            className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>

      <div className="h-16" />

      <div className="absolute bottom-0 h-fit w-full bg-gradient-to-t from-black via-black to-transparent p-3 pt-8 z-10">
        <h3 className="truncate text-2xl font-bold">
          {hero.localized_name || `Hero ${hero.id}`}
        </h3>

        <div className="mt-2 space-y-2">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
