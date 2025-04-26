import { Sword } from "lucide-react";
import SecondLayout from "~/components/layouts/second-layout";
import HeroCard from "~/components/ui/hero-card";
import PercentageBar from "~/components/ui/percentage-bar";
import type { HeroStats } from "~/types/heroes";
import {
  calculatePickrate,
  calculateTotalPicks,
  calculateTotalPicksAllHeroes,
  calculateWinrate,
} from "~/utils/heroUtils";

const HeroesPage = async () => {
  let data: HeroStats[] = [];
  let totalHeroPicks = 0;

  try {
    const res = await fetch("https://api.opendota.com/api/herostats", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    data = (await res.json()) as HeroStats[];
    totalHeroPicks = calculateTotalPicksAllHeroes(data);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      // TODO: enhance the error handling
      return <div>Error loading data: {error.message}</div>;
    }
  }

  return (
    <SecondLayout
      title="Hero Overview"
      logo={Sword}
      description="Detailed statistics for all Dota 2 heroes, including win rates, pick
          rates, and performance metrics"
      heading="Hero Statistics"
      subheading="Comprehensive data on all heroes in the current meta"
    >
      <div className="hero-card">
        {data.length > 0 ? (
          data.map((d) => {
            const totalPicks = calculateTotalPicks(d);
            const winRate = Number(calculateWinrate(d, totalPicks));
            const pickRate = Number(calculatePickrate(d, totalHeroPicks));
            return (
              <HeroCard
                key={d.name}
                hero={d}
                footer={
                  <>
                    <PercentageBar
                      title="Win Rate"
                      num={null}
                      percentage={winRate}
                      barColor="secondary"
                    />
                    <PercentageBar
                      title="Pick Rate"
                      num={totalPicks}
                      percentage={pickRate}
                      barColor="guardian"
                      colorPercent={"primary"}
                    />
                  </>
                }
              />
            );
          })
        ) : (
          <div>No data found.</div>
        )}
      </div>
    </SecondLayout>
  );
};

export default HeroesPage;
