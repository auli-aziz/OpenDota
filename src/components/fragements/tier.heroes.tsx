const TierHeroes = ({ tier }: { tier: number }) => {
  const heroes = await getTopHeroesByTier(tier)

  return (
    <div className="hero-grid">
      {heroes.map((heroStat, index) => (
        <HeroCard key={heroStat.hero_id} heroStat={heroStat} index={index} tier={tier} />
      ))}
    </div>
  )
}

export default TierHeroes;