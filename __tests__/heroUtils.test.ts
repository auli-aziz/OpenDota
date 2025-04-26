import '@testing-library/jest-dom';
import { calculateTotalPicks } from '~/utils/heroUtils';
import type { HeroStats } from '~/types/heroes';
import { mock_hero } from './utils/constants';

const calculateExpectedTotal = (hero: HeroStats) => {
  return hero["1_pick"] +
    hero["2_pick"] +
    hero["3_pick"] +
    hero["4_pick"] +
    hero["5_pick"] +
    hero["6_pick"] +
    hero["7_pick"] +
    hero["8_pick"];
};

describe('calculateTotalPicks', () => {
  it('should correctly sum all pick counts', () => {
    const expectedTotal = calculateExpectedTotal(mock_hero as HeroStats);
    const result = calculateTotalPicks(mock_hero as HeroStats);
    expect(result).toBe(expectedTotal);
  });

  it('should return 0 if all pick counts are 0', () => {
    const emptyHero = {
      ...mock_hero,
      "1_pick": 0,
      "2_pick": 0,
      "3_pick": 0,
      "4_pick": 0,
      "5_pick": 0,
      "6_pick": 0,
      "7_pick": 0,
      "8_pick": 0,
    };

    const result = calculateTotalPicks(emptyHero as HeroStats);
    expect(result).toBe(0);
  });

  it('should treat missing pick fields as 0', () => {
    const brokenHero = {
      ...mock_hero,
      "8_pick": undefined,
    };

    const expectedTotal = calculateExpectedTotal(mock_hero as HeroStats) - mock_hero["8_pick"];
    const result = calculateTotalPicks(brokenHero as unknown as HeroStats);
    expect(result).toBe(expectedTotal);
  });
});
