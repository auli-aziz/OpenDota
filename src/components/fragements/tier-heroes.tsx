"use client";

import { useState, useEffect } from "react";
import type { HeroStats, TierHeroStats } from "~/types/heroes";
import { getTop10ByTier } from "~/utils/heroUtils";
import HeroCardSkeleton from "./hero-card-skeleton";
import HeroCard from "../ui/hero-card";
import DarkBadge from "../ui/dark-badge";
import PercentageBar from "../ui/percentage-bar";

const TierHeroes = ({ tier }: { tier: number }) => {
  const [heroes, setHeroes] = useState<TierHeroStats[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null);
        const res = await fetch("https://api.opendota.com/api/herostats");
        const data = (await res.json()) as HeroStats[];
        const topHeroes = getTop10ByTier(data, tier);
        setHeroes(topHeroes);
      } catch (e) {
        console.error("Failed to fetch heroes", e);
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [tier]);
  return (
    <>
      {loading ? (
        <div className="grid grid-cols-5 gap-5">
          {Array.from({ length: 10 }, (_, i) => (
            <HeroCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-5 gap-5">
          {heroes.map((hero, index) => (
            <HeroCard
              key={hero.name}
              hero={hero}
              tag={<DarkBadge content={"#" + (index + 1).toString()} />}
              footer={
                <>
                  <PercentageBar
                    title="Win Rate"
                    percentage={Number(hero.winrate.toFixed(2))}
                    num={null}
                    barColor={"secondary"}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="">Games Played</span>{" "}
                    <span className="text-primary font-semibold text-base">{hero.pro_pick?.toLocaleString()}</span>
                  </div>
                </>
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TierHeroes;
