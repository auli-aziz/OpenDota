"use client";

import { useState } from "react";
import SecondLayout from "~/components/layouts/second-layout";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { TIERS } from "~/utils/constants";
import TierHeroes from "~/components/fragements/tier-heroes";
import Tab from "~/components/ui/tab";

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
      <div className="flex flex-col items-center gap-y-8 px-4 sm:px-8 md:px-10 py-5">
        <Tab>
          <div className="flex flex-wrap justify-center gap-3">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`bg-background-primary text-md min-w-24 rounded-md py-1 px-3 text-center font-semibold transition-transform hover:cursor-pointer ${
                  activeTab === tier.id
                    ? "tier-tab-active"
                    : "hover:border-secondary/40 hover:-translate-0.5 hover:border-b-2"
                }`}
                onClick={() => setActiveTab(tier.id)}
              >
                <span className={`${tier.textColor}`}>{tier.name}</span>
              </div>
            ))}
          </div>
        </Tab>

        <div className="w-full">
          <TierHeroes tier={activeTab} />
        </div>
      </div>
    </SecondLayout>
  );
};

export default TiersPage;
