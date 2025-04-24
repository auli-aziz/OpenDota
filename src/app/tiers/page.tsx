"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SecondLayout from "~/components/layouts/second-layout";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import type { HeroStats, TierHeroStats } from "~/types/heroes";

const TIERS = [
  { id: 1, name: "Herald", color: "gray" },
  { id: 2, name: "Guardian", color: "green" },
  { id: 3, name: "Crusader", color: "emerald" },
  { id: 4, name: "Archon", color: "blue" },
  { id: 5, name: "Legend", color: "indigo" },
  { id: 6, name: "Ancient", color: "purple" },
  { id: 7, name: "Divine", color: "pink" },
  { id: 8, name: "Immortal", color: "gold" },
];

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
    .slice(0, 10) as TierHeroStats[];
};

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

    fetchData();
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

const TiersPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <SecondLayout
      title="Top Heroes by Tier"
      logo={ChartNoAxesColumnIncreasing}
      description="Best-performing heroes for each skill tier based on winrate"
      heading="Tier Meta Suggestions"
      subheading="Top 10 best heroes for every matchmaking tier"
    >
      <div className="tier-wrapper">
        <div className="tabs">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`tab ${activeTab === tier.id ? "active" : ""}`}
              onClick={() => setActiveTab(tier.id)}
            >
              <span className={`text-${tier.color}`}>{tier.name}</span>
            </div>
          ))}
        </div>

        <div className="tab-content">
          <TierHeroes tier={activeTab} />
        </div>
      </div>
    </SecondLayout>
  );
};

export default TiersPage;
