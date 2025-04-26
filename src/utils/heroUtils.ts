import type { HeroStats, PlayerHero, TierHeroStats } from "~/types/heroes";

export const calculateTotalPicks = (hero: HeroStats) => {
  const totalPicks =
    hero["1_pick"] +
    hero["2_pick"] +
    hero["3_pick"] +
    hero["4_pick"] +
    hero["5_pick"] +
    hero["6_pick"] +
    hero["7_pick"] +
    hero["8_pick"];

  return totalPicks;
};

export const calculateTotalPicksAllHeroes = (heroes: HeroStats[]) => {
  const totalPicks = heroes.reduce(
    (sum, curr) =>
      curr
        ? sum +
          (curr["1_pick"] +
            curr["2_pick"] +
            curr["3_pick"] +
            curr["4_pick"] +
            curr["5_pick"] +
            curr["6_pick"] +
            curr["7_pick"] +
            curr["8_pick"])
        : 0,
    0,
  );

  return totalPicks;
};

export const calculateWinrate = (hero: HeroStats, totalPicks: number) => {
  const totalWins =
    hero["1_win"] +
    hero["2_win"] +
    hero["3_win"] +
    hero["4_win"] +
    hero["5_win"] +
    hero["6_win"] +
    hero["7_win"] +
    hero["8_win"];

  return ((totalWins / totalPicks) * 100).toFixed(2);
};

export const calculatePickrate = (hero: HeroStats, totalPicks: number) => {
  const heroPicks =
    hero["1_pick"] +
    hero["2_pick"] +
    hero["3_pick"] +
    hero["4_pick"] +
    hero["5_pick"] +
    hero["6_pick"] +
    hero["7_pick"] +
    hero["8_pick"];

  return ((heroPicks / totalPicks) * 100).toFixed(2);
};

// function for pro-meta page
export const getTopHeroesByProStats = (heroes: HeroStats[]) => {
  const totalProScore: number = heroes.reduce(
    (sum, hero) => sum + (hero.pro_pick ?? 0) + (hero.pro_ban ?? 0),
    0,
  );
  return heroes
    .map((hero) => {
      const proScore = (hero.pro_pick ?? 0) + (hero.pro_ban ?? 0);
      const proScorePercent =
        totalProScore > 0 ? (proScore / totalProScore) * 100 : 0;
      const proWin = hero.pro_pick > 0 ? hero.pro_win : 0;
      const proWinrate =
        hero.pro_pick > 0 ? (hero.pro_win / hero.pro_pick) * 100 : 0;
      return { ...hero, proScore, proScorePercent, proWin, proWinrate };
    })
    .filter((h) => h.proScore > 50)
    .sort((a, b) => b.proScore - a.proScore);
};

// function for top tiers page
export const getTop10ByTier = (heroes: HeroStats[], tier: number) => {
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

// function for recommendations page
export const getRecommendedHeroes = ({
  allHeroes,
  playerHeroes,
}: {
  allHeroes: HeroStats[];
  playerHeroes: PlayerHero[];
}) => {
  // find most frequently played heroes by the player
  const topHeroes = playerHeroes.sort((a, b) => b.games - a.games).slice(0, 5);

  // get complete data of player's top heroes
  const topHeroesData = topHeroes.map((hero) =>
    allHeroes.find((h) => h.id === hero.hero_id),
  );

  // save common roles in a set
  const commonRoles = new Set<string>();
  topHeroesData.forEach((hero) => {
    hero?.roles.forEach((role: string) => commonRoles.add(role));
  });


  const recommended = allHeroes
    .filter((hero) => {
      // check if the player has already played this hero
      const playerHero = playerHeroes.find((h) => h.hero_id === hero.id);
      // to see the heroes with low play coun
      const hasLowPlayCount = !playerHero || playerHero.games < 5;

      // check if the hero has the same role as the player's favorite role
      const hasCommonRole = hero.roles.some((role: string) =>
        commonRoles.has(role),
      );

      // check if the hero has a good win rate
      const hasGoodWinrate = hero.pro_win / hero.pro_pick > 0.5;
      return hasCommonRole && hasLowPlayCount && hasGoodWinrate;
    })
    .sort((a, b) => b.pro_win / b.pro_pick - a.pro_win / a.pro_pick)
    .slice(0, 8);
  return recommended;
};
