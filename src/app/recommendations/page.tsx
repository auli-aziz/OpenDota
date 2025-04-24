"use client"

import { useEffect, useState } from "react";
import { Users, Swords } from "lucide-react";
import Image from "next/image";
import type { HeroStats, PlayerHero } from "../../types/heroes";

const RecommendationsPage = () => {
  const [suggestedHeroes, setSuggestedHeroes] = useState<HeroStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const accountId = "152740380";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch player's heroes
        const playerHeroesResponse = await fetch(
          `https://api.opendota.com/api/players/${accountId}/heroes`
        );
        const playerHeroes: PlayerHero[] = await playerHeroesResponse.json();

        // Fetch all hero stats
        const heroStatsResponse = await fetch(
          "https://api.opendota.com/api/herostats"
        );
        const allHeroes: HeroStats[] = await heroStatsResponse.json();

        // Get top 5 most played heroes
        const topHeroes = playerHeroes
          .sort((a, b) => b.games - a.games)
          .slice(0, 5);

        // Get roles from top heroes
        const topHeroesData = topHeroes.map((hero) =>
          allHeroes.find((h) => h.id === hero.hero_id)
        );
        const commonRoles = new Set<string>();
        topHeroesData.forEach((hero) => {
          hero?.roles.forEach((role: string) => commonRoles.add(role));
        });

        // Filter and recommend heroes
        const recommended = allHeroes
          .filter((hero) => {
            const playerHero = playerHeroes.find((h) => h.hero_id === hero.id);
            const hasCommonRole = hero.roles.some((role: string) => commonRoles.has(role));
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

    fetchData();
  }, [accountId]);

  return (
    <div>
      <div className="mb-9 flex w-full flex-col gap-y-1">
        <div className="text-secondary flex h-12 items-center gap-6">
          <Users className="h-10 w-10" />
          <h1 className="text-4xl font-bold">Player Hero Recommendations</h1>
        </div>
        <p className="text-text-primary mt-1 text-xl">
          Get personalized hero recommendations based on your play history and
          performance
        </p>
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
            <div className="text-secondary mb-4 flex h-12 items-center gap-6">
              <Swords className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Suggested Heroes</h2>
            </div>
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
                    <h3 className="text-xl font-semibold">{hero.localized_name}</h3>
                    <p className="text-text-secondary mt-2">
                      Win Rate: {((hero.pro_win / hero.pro_pick) * 100).toFixed(1)}%
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
  );
};

export default RecommendationsPage;
