"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { HeroStats, TierHeroStats } from "~/types/heroes";
import { getTop10ByTier } from "~/utils/heroUtils";

const TierHeroes = ({ tier }: { tier: number }) => {
  const [heroes, setHeroes] = useState<TierHeroStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.opendota.com/api/herostats");
        const data = (await res.json()) as HeroStats[];
        const topHeroes = getTop10ByTier(data, tier);
        setHeroes(topHeroes);
      } catch (e) {
        console.error("Failed to fetch heroes", e);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [tier]);

  if (loading) return <div>Loading heroes...</div>;

  return (
    <div className="hero-grid">
      {heroes.map((hero, index) => (
        <div key={hero.id} className="hero-card">
          <div className="hero-image">
            <Image
              width={300}
              height={170}
              className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
              src={`https://cdn.cloudflare.steamstatic.com${hero.img}`}
              alt={hero.localized_name}
            />
          </div>
          <div className="hero-info">
            <h3>
              {index + 1}. {hero.localized_name}
            </h3>
            <p>Winrate: {hero.winrate.toFixed(2)}%</p>
            <p>Games Played: {hero.pro_pick?.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TierHeroes;