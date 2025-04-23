import { Sword } from "lucide-react";
import Image from "next/image";
import SecondLayout from "~/components/layouts/second-layout";
import type { HeroStats } from "~/types/heroes";
import { calculateTotalPicks, calculateWinrate } from "~/utils/heroUtils";

const ATTRIBUTES = {
  str: { name: "Strength", color: "hero-attribute-str" },
  agi: { name: "Agility", color: "hero-attribute-agi" },
  int: { name: "Intelligence", color: "hero-attribute-int" },
  all: { name: "Universal", color: "hero-attribute-uni" },
};

const HeroesPage = async () => {
  let data: HeroStats[] = [];

  try {
    const res = await fetch("https://api.opendota.com/api/herostats", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    data = (await res.json()) as HeroStats[];
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return <div>Error loading data: {error.message}</div>;
    }
  }

  return (
    <SecondLayout
      title="Hero Overview"
      logo={Sword}
      description="Detailed statistics for all Dota 2 heroes, including win rates, pick
          rates, and performance metrics"
      heading="Hero Statistics"
      subheading="Comprehensive data on all heroes in the current meta"
    >
      <div className="grid w-full grid-cols-4 gap-5 p-10">
        {data.length > 0 ? (
          data.map((d) => {
            const totalPicks = calculateTotalPicks(d);
            const winRate = Number(calculateWinrate(d, totalPicks));
            return (
              <div
                key={d.name}
                className={
                  "border-border-primary hover:border-secondary relative cursor-pointer overflow-hidden rounded-xl border-2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-md hover:shadow-amber-200"
                }
              >
                <div className="absolute top-2 left-2 z-10">
                  <div
                    className={`bg-black/70 border-${ATTRIBUTES[d.primary_attr]?.color} text-${ATTRIBUTES[d.primary_attr]?.color}`}
                  >
                    <span className={ATTRIBUTES[d.primary_attr]?.color}>●</span>
                  </div>
                </div>
                {/* <div className="absolute top-2 right-2 z-10">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={winRateClass}>{winRate.toFixed(2)}%</Badge>
                      </TooltipTrigger>
                      <TooltipContent className="dota-tooltip">
                        <p>Win rate across {hero.games_played?.toLocaleString() || 0} games</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div> */}
                <div className="h-40 w-full overflow-hidden">
                  {d.img && (
                    <Image
                      src={`https://cdn.cloudflare.steamstatic.com${d.img}`}
                      alt={d.name || `Hero ${d.id}`}
                      width={300}
                      height={170}
                      className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="truncate text-lg font-bold">
                    {d.localized_name || `Hero ${d.id}`}
                  </h3>

                  <div className="mt-2 space-y-2">
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>Win Rate</span>
                        <span
                          className={
                            winRate > 52
                              ? "text-immortal"
                              : winRate < 48
                                ? "text-secondary"
                                : "text-text-primary"
                          }
                        >
                          {winRate.toFixed(2)}%
                        </span>
                      </div>
                      <div className="hero-stat-bar">
                        <div
                          className="hero-stat-bar-fill hero-stat-bar-win"
                          style={{
                            width: `${winRate}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No data found.</div>
        )}
      </div>
    </SecondLayout>
  );
};

export default HeroesPage;
