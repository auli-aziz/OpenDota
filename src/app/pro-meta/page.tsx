"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SecondLayout from "~/components/layouts/second-layout";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import type { TopHeroesByProStats, HeroStats } from "~/types/heroes";
import { getTopHeroesByProStats } from "~/utils/heroUtils";
import PercentageBar from "~/components/ui/percentage-bar";
import StatDisplay from "~/components/ui/stat-display";
import DarkBadge from "~/components/ui/dark-badge";
import HeroCardListSkeleton from "~/components/fragements/hero-card-list-skeleton";
import HeroCardList from "~/components/ui/hero-card-list";

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
          {Array.from({ length: 3 }, (_, i) => (
            <HeroCardListSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-5">
          {heroes.map((hero, index) => (
              <HeroCardList
                key={hero.name}
                hero={hero}
                header={<DarkBadge content={"#" + (index + 1).toString()} />}
                description={
                  <>
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
                  </>
                }
                stats={
                  <>
                    <StatDisplay
                      num={Number(hero.pro_pick)}
                      color={"text-secondary"}
                      name="Picks"
                    />
                    <StatDisplay
                      num={Number(hero.pro_ban)}
                      color={"text-primary"}
                      name="Bans"
                    />
                  </>
                }
              />
          ))}
        </div>
      )}
    </SecondLayout>
  );
};

export default TopHeroesPage;
