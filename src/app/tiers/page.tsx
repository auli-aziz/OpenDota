import { ChartNoAxesColumnIncreasing } from "lucide-react";
import Image from "next/image";
import SecondLayout from "~/components/layouts/second-layout";
import type { HeroStats } from "~/types/heroes";

const ATTRIBUTES = {
  str: { name: "Strength", color: "hero-attribute-str" },
  agi: { name: "Agility", color: "hero-attribute-agi" },
  int: { name: "Intelligence", color: "hero-attribute-int" },
  all: { name: "Universal", color: "hero-attribute-uni" },
};

const TIERS = [
  { id: 1, name: "Herald", color: "text-gray-400" },
  { id: 2, name: "Guardian", color: "text-green-400" },
  { id: 3, name: "Crusader", color: "text-emerald-400" },
  { id: 4, name: "Archon", color: "text-blue-400" },
  { id: 5, name: "Legend", color: "text-indigo-400" },
  { id: 6, name: "Ancient", color: "text-purple-400" },
  { id: 7, name: "Divine", color: "text-pink-400" },
  { id: 8, name: "Immortal", color: "text-dota-gold" },
]

const getTop10ByTier = (heroes: HeroStats[], tier: number) => {
  const tierPickKey = `${tier}_pick` as keyof HeroStats;
  const tierWinKey = `${tier}_win` as keyof HeroStats;

  return heroes
    .map((hero) => {
      const picks = hero[tierPickKey] as number;
      const wins = hero[tierWinKey] as number;
      const winrate = picks > 0 ? (wins / picks) * 100 : 0;
      return { ...hero, tier, picks, wins, winrate };
    })
    .filter((h) => h.picks > 50)
    .sort((a, b) => b.winrate - a.winrate)
    .slice(0, 10);
};

const TiersPage = async () => {
  let data: HeroStats[] = [];

  try {
    const res = await fetch("https://api.opendota.com/api/herostats", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    data = (await res.json()) as HeroStats[];
  } catch (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <SecondLayout
      title="Top Heroes by Tier"
      logo={ChartNoAxesColumnIncreasing}
      description="Best-performing heroes for each skill tier based on winrate"
      heading="Tier Meta Suggestions"
      subheading="Top 10 best heroes for every matchmaking tier"
    >
      <div className="space-y-10 p-5">
        {TIERS.map((tier) => {
          const topHeroes = getTop10ByTier(data, tier.id);
          return (
            <div key={tier.name}>
              <h2 className="text-xl font-bold mb-4">Tier {tier.id}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {topHeroes.map((hero) => (
                  <div
                    key={hero.id}
                    className="border-border-primary hover:border-secondary relative cursor-pointer overflow-hidden rounded-xl border-2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-md hover:shadow-amber-200"
                  >
                    <div className="absolute top-2 left-2 z-10">
                      <div
                        className={`bg-black/70 border-${ATTRIBUTES[hero.primary_attr]?.color} text-${ATTRIBUTES[hero.primary_attr]?.color}`}
                      >
                        <span className={ATTRIBUTES[hero.primary_attr]?.color}>●</span>
                      </div>
                    </div>
                    <div className="h-32 w-full overflow-hidden">
                      <Image
                        src={`https://cdn.cloudflare.steamstatic.com${hero.img}`}
                        alt={hero.localized_name}
                        width={300}
                        height={170}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="truncate text-sm font-bold">
                        {hero.localized_name}
                      </h3>
                      <div className="mt-1 flex justify-between text-xs">
                        <span>Winrate</span>
                        <span
                          className={
                            hero.winrate > 52
                              ? "text-immortal"
                              : hero.winrate < 48
                              ? "text-secondary"
                              : "text-text-primary"
                          }
                        >
                          {hero.winrate.toFixed(2)}%
                        </span>
                      </div>
                      <div className="hero-stat-bar">
                        <div
                          className="hero-stat-bar-fill hero-stat-bar-win"
                          style={{ width: `${hero.winrate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SecondLayout>
  );
};

export default TiersPage;