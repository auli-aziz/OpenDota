"use client";

import { useState } from "react";
import SecondLayout from "~/components/layouts/second-layout";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { TIERS } from "~/utils/constants";
import TierHeroes from "~/components/fragements/tier-heroes";

const TiersPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <SecondLayout
      title="Top Heroes by Tier"
      logo={ChartNoAxesColumnIncreasing}
      description="Best-performing heroes for each skill tier based on winrate"
      heading="Tier Meta Suggestions"
      subheading="Top 10 best heroes for every matchmaking tier"
    >
      <div className="flex flex-col items-center gap-y-8 p-5">
        <div className="bg-background-tertiary flex w-fit justify-between gap-x-1 p-1">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`hover:cursor-pointer transition-transform bg-background-primary min-w-28 rounded-md py-1 text-center text-md font-semibold ${activeTab === tier.id ? "tier-tab-active" : "hover:-translate-0.5 hover:border-b-2 hover:border-secondary/40"}`}
              onClick={() => setActiveTab(tier.id)}
            >
              <span className={`${tier.textColor}`}>{tier.name}</span>
            </div>
          ))}
        </div>

        <div>
          <TierHeroes tier={activeTab} />
        </div>
      </div>
    </SecondLayout>
  );
};

export default TiersPage;
