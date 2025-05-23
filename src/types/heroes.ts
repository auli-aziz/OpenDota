export interface HeroStats {
  id: number;
  name: string;
  primary_attr: 'str' | 'agi' | 'int';
  attack_type: 'Melee' | 'Ranged';
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  base_attack_time: number;
  attack_point: number;
  move_speed: number;
  turn_rate: number | null;
  cm_enabled: boolean;
  legs: number;
  day_vision: number;
  night_vision: number;
  localized_name: string;
  "1_pick": number;
  "1_win": number;
  "2_pick": number;
  "2_win": number;
  "3_pick": number;
  "3_win": number;
  "4_pick": number;
  "4_win": number;
  "5_pick": number;
  "5_win": number;
  "6_pick": number;
  "6_win": number;
  "7_pick": number;
  "7_win": number;
  "8_pick": number;
  "8_win": number;
  turbo_picks: number;
  turbo_picks_trend: number[];
  turbo_wins: number;
  turbo_wins_trend: number[];
  pro_pick: number;
  pro_win: number;
  pro_ban: number;
  pub_pick: number;
  pub_pick_trend: number[];
  pub_win: number;
  pub_win_trend: number[];
}

export interface TierHeroStats extends HeroStats {
  tier: number;
  picks: number;
  wins: number;
  winrate: number;
}

export interface TopHeroesByProStats extends HeroStats {
  proScorePercent: number;
  proScore: number;
  proWinrate: number;
  proWin: number;
}

export interface PlayerHero {
  hero_id: number;
  last_played: number;
  games: number;
  win: number;
  with_games: number;
  with_win: number;
  against_games: number;
  against_win: number;
}