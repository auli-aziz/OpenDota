import { Sword } from "lucide-react";
import Image from "next/image";
import type { HeroStats } from "~/types/heroes";
import { calculateTotalPicks, calculateWinrate } from "~/utils/heroUtils";

const HeroesPage = async () => {
  let data: HeroStats[] = [];

  try {
    const res = await fetch("https://api.opendota.com/api/herostats", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    data = (await res.json()) as HeroStats[];
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return <div>Error loading data: {error.message}</div>;
    }
  }

  return (
    <div className="w-full">
      <div className="mb-12 flex w-full flex-col gap-y-1">
        <div className="text-secondary flex h-12 items-center gap-6">
          <Sword className="h-10 w-10" />
          <h1 className="text-4xl font-bold">Hero Overview</h1>
        </div>
        <p className="text-text-primary mt-1 text-xl">
          Detailed statistics for all Dota 2 heroes, including win rates, pick
          rates, and performance metrics
        </p>
      </div>
      <div className="border-border-tertiary h-screen rounded-xl border-2">
        <div>
          <h1 className="text-3xl font-bold">Hero Statistics</h1>
          <p className="text-text-primary mt-1 text-xl">
            Detailed statistics for all Dota 2 heroes, including win rates, pick
            rates, and performance metrics
          </p>
        </div>
      </div>

      {data.length > 0 ? (
        data.map((d) => {
          const totalPicks = calculateTotalPicks(d);
          return (
            <div key={d.name} className={""}>
              <Image
                src={"https://cdn.cloudflare.steamstatic.com" + d.img}
                alt={d.name}
                width={40}
                height={40}
              />
              <h1>{d.localized_name}</h1> {/* Use localized name for clarity */}
              <div>Win rate: {calculateWinrate(d, totalPicks)}%</div>
            </div>
          );
        })
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default HeroesPage;
