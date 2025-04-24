import type { HeroStats } from "~/types/heroes";

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

export const getTopHeroesByProStats = (heroes: HeroStats[]) => {
  const totalProScore: number = heroes.reduce(
    (sum, hero) => sum + (hero.pro_pick ?? 0) + (hero.pro_ban ?? 0),
    0,
  );
  return heroes
    .map((hero) => {
      const proScore = (hero.pro_pick ?? 0) + (hero.pro_ban ?? 0);
      const proScorePercent = totalProScore > 0 ? (proScore / totalProScore) * 100 : 0;
      const proWin = hero.pro_pick > 0 ? hero.pro_win : 0;
      const proWinrate = hero.pro_pick > 0 ? (hero.pro_win / hero.pro_pick) * 100 : 0;
      return { ...hero, proScore, proScorePercent, proWin, proWinrate };
    })
    .filter((h) => h.proScore > 50)
    .sort((a, b) => b.proScore - a.proScore);
};
