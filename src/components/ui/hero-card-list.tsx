import Image from "next/image";
import type { HeroStats } from "~/types/heroes";
import type { ReactNode } from "react";

const HeroCardList = ({
  hero,
  header,
  description,
  stats,
}: {
  hero: HeroStats;
  header: ReactNode;
  description: ReactNode;
  stats: ReactNode;
}) => {
  return (
    <div className="bg-background-tertiary hover:bg-background-hover flex overflow-hidden rounded-xl transition-all">
      <div className="p-5">
        <Image
          width={300}
          height={170}
          className="border-border-tertiary h-full min-w-36 transform overflow-hidden rounded-xl border-2 object-cover transition-transform duration-500 group-hover:scale-110"
          src={`https://cdn.cloudflare.steamstatic.com${hero.img}`}
          alt={hero.localized_name}
        />
      </div>
      <div className="w-[3500px] overflow-x-auto p-5">
        <div className="mb-1 flex h-10 items-center gap-4">
          <h3 className="text-2xl font-bold">{hero.localized_name}</h3>
          {header}
        </div>
        <div className="flex flex-col gap-y-1">{description}</div>
      </div>
      <div className="flex w-full">{stats}</div>
    </div>
  );
};

export default HeroCardList;
