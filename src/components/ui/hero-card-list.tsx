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
    <div className="bg-background-tertiary hover:bg-background-hover flex flex-col items-center overflow-hidden sm:overflow-auto rounded-xl transition-all sm:flex-row">
      <div className="w-full sm:p-5 sm:w-1/3">
        <Image
          width={300}
          height={170}
          className="border-border-tertiary h-full min-w-36 transform overflow-hidden rounded-xl border-2 object-cover transition-transform duration-500 group-hover:scale-110"
          src={`https://cdn.cloudflare.steamstatic.com${hero.img}`}
          alt={hero.localized_name}
        />
      </div>
      <div className="flex-1 p-5 lg:min-w-[650px] lg:overflow-x-auto">
        <div className="mb-1 flex h-10 items-center gap-4">
          <h3 className="text-2xl font-bold">{hero.localized_name}</h3>
          {header}
        </div>
        <div className="flex flex-col gap-y-1">{description}</div>
      </div>
      <div className="mb-5 flex w-full sm:mb-0">{stats}</div>
    </div>
  );
};

export default HeroCardList;
