"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SecondLayout from "~/components/layouts/second-layout";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import type { TopHeroesByProStats, HeroStats } from "~/types/heroes";
import { getTopHeroesByProStats } from "~/utils/heroUtils";
import PercentageBar from "~/components/ui/percentage-bar";
import StatDisplay from "~/components/ui/stat-display";
import RankDisplay from "~/components/ui/rank-display";
import ProMetaSkeleton from "~/components/fragements/pro-meta-skeleton";

const TopHeroesPage = () => {
  const [heroes, setHeroes] = useState<TopHeroesByProStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.opendota.com/api/herostats");
        const data = (await res.json()) as HeroStats[];
        const topHeroes = getTopHeroesByProStats(data);
        setHeroes(topHeroes);
      } catch (e) {
        console.error("Failed to fetch hero stats", e);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <SecondLayout
      title="Top Heroes by Pro Stats"
      logo={ChartNoAxesColumnIncreasing}
      description="View heroes with the highest pro statistics in real time"
      heading="Pro Meta Suggestions"
      subheading="Top heroes in professional matches based on Pick + Ban Rate and Win Rate"
    >
      {loading ? (
        <div className="p-5">
          <ProMetaSkeleton />
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-5">
          {heroes.map((hero, index) => (
            <div
              key={hero.id}
              className="bg-background-tertiary hover:bg-background-hover flex overflow-hidden rounded-xl transition-all"
            >
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
                  <h3 className="text-2xl font-bold">{hero.localized_name}</h3>{" "}
                  <RankDisplay index={index} />
                </div>
                <div className="flex flex-col gap-y-1">
                  <PercentageBar
                    title="Pro Pick + Ban"
                    percentage={Number(hero.proScorePercent.toFixed(2))}
                    num={Number(hero.proScore)}
                    color="bg-secondary"
                  />
                  <PercentageBar
                    title="Pro Win"
                    percentage={Number(hero.proWinrate.toFixed(2))}
                    num={Number(hero.proWin)}
                    color="bg-guardian"
                  />
                </div>
              </div>
              <div className="flex w-full">
                <StatDisplay
                  num={Number(hero.pro_pick)}
                  color={"text-secondary"}
                />
                <StatDisplay
                  num={Number(hero.pro_ban)}
                  color={"text-primary"}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </SecondLayout>
  );
};

export default TopHeroesPage;
