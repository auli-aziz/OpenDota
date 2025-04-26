"use client";

import { useRef, useState } from "react";
import { Users } from "lucide-react";
import Image from "next/image";
import type { HeroStats, PlayerHero } from "../../types/heroes";
import SecondLayout from "~/components/layouts/second-layout";
import PlayerInput from "~/components/ui/player-input";
import { getRecommendedHeroes } from "~/utils/heroUtils";
import DefaultRecommendations from "~/components/ui/default-recommendations";
import { EXAMPLE_PLAYERS } from "~/utils/constants";
import HeroCard from "~/components/ui/hero-card";
import PercentageBar from "~/components/ui/percentage-bar";
import MapRedBadge from "~/components/fragements/map-red-badge";

const RecommendationsPage = () => {
  const [suggestedHeroes, setSuggestedHeroes] = useState<HeroStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accountRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const playerHeroesResponse = await fetch(
        `https://api.opendota.com/api/players/${accountRef.current!.value}/heroes`,
      );
      const playerHeroes = (await playerHeroesResponse.json()) as PlayerHero[];

      const heroStatsResponse = await fetch(
        "https://api.opendota.com/api/herostats",
      );
      const allHeroes = (await heroStatsResponse.json()) as HeroStats[];

      const recommended = getRecommendedHeroes({ allHeroes, playerHeroes });

      setSuggestedHeroes(recommended);
    } catch (err) {
      setError("Failed to fetch hero data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecondLayout
      title="Player Hero Recommendations"
      logo={Users}
      description="Get personalized hero recommendations based on your play history and
            performance"
      heading="Hero Recommendations"
      subheading="Get personalized hero recommendations based on your play history"
    >
      <div className="flex flex-col gap-y-5 p-5">
        <PlayerInput ref={accountRef} setAccountId={fetchData} />
        <div className="text-text-primary flex items-center gap-x-5">
          <span>Example IDs:</span>
          {EXAMPLE_PLAYERS.map((example) => (
            <button
              key={example.id}
              onClick={() => {
                accountRef.current!.value = example.id.toString();
                void fetchData();
              }}
              className="border-border-tertiary rounded-lg border-2 px-5 py-2"
            >
              <span className="font-semibold">{example.name}</span> (
              {example.id})
            </button>
          ))}
        </div>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-2xl">Loading...</div>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-2xl text-red-500">{error}</div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {suggestedHeroes.map((hero) => (
                  <>
                    <HeroCard
                      key={hero.name}
                      hero={hero}
                      footer={
                        <>
                          <PercentageBar
                            title="Win Rate"
                            percentage={Number(
                              ((hero.pro_win / hero.pro_pick) * 100).toFixed(1),
                            )}
                            num={null}
                            barColor="bg-immortal"
                          />
                          <MapRedBadge hero={hero} />
                        </>
                      }
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        )}

        <DefaultRecommendations
          loading={loading}
          error={error}
          suggestedHeroes={suggestedHeroes}
        />
      </div>
    </SecondLayout>
  );
};

export default RecommendationsPage;
