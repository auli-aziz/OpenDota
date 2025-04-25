"use client";

import { useRef, useState } from "react";
import { Users } from "lucide-react";
import Image from "next/image";
import type { HeroStats, PlayerHero } from "../../types/heroes";
import SecondLayout from "~/components/layouts/second-layout";
import PlayerInput from "~/components/ui/player-input";

const RecommendationsPage = () => {
  const [suggestedHeroes, setSuggestedHeroes] = useState<HeroStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accountRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const playerHeroesResponse = await fetch(
        `https://api.opendota.com/api/players/${accountRef.current!.value}/heroes`,
      );
      const playerHeroes: PlayerHero[] = await playerHeroesResponse.json();

      const heroStatsResponse = await fetch(
        "https://api.opendota.com/api/herostats",
      );
      const allHeroes: HeroStats[] = await heroStatsResponse.json();

      const topHeroes = playerHeroes
        .sort((a, b) => b.games - a.games)
        .slice(0, 5);

      // Get roles from top heroes
      const topHeroesData = topHeroes.map((hero) =>
        allHeroes.find((h) => h.id === hero.hero_id),
      );
      const commonRoles = new Set<string>();
      topHeroesData.forEach((hero) => {
        hero?.roles.forEach((role: string) => commonRoles.add(role));
      });

      const recommended = allHeroes
        .filter((hero) => {
          const playerHero = playerHeroes.find((h) => h.hero_id === hero.id);
          const hasCommonRole = hero.roles.some((role: string) =>
            commonRoles.has(role),
          );
          const hasLowPlayCount = !playerHero || playerHero.games < 5;
          const hasGoodWinrate = hero.pro_win / hero.pro_pick > 0.5;
          return hasCommonRole && hasLowPlayCount && hasGoodWinrate;
        })
        .sort((a, b) => b.pro_win / b.pro_pick - a.pro_win / a.pro_pick)
        .slice(0, 6);

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
        <button
          onClick={() => {
            accountRef.current!.value = "152740380";
            void fetchData();
          }}
        >
          152740380
        </button>
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
                  <div
                    key={hero.id}
                    className="bg-background-secondary rounded-lg p-4 shadow-md"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.img}`}
                        alt={hero.localized_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">
                        {hero.localized_name}
                      </h3>
                      <p className="text-text-secondary mt-2">
                        Win Rate:{" "}
                        {((hero.pro_win / hero.pro_pick) * 100).toFixed(1)}%
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {hero.roles.map((role: string) => (
                          <span
                            key={role}
                            className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SecondLayout>
  );
};

export default RecommendationsPage;
