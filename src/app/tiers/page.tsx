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
      <div className="tier-wrapper">
        <div className="tabs">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`tab ${activeTab === tier.id ? "active" : ""}`}
              onClick={() => setActiveTab(tier.id)}
            >
              <span className={`text-${tier.color}`}>{tier.name}</span>
            </div>
          ))}
        </div>

        <div className="tab-content">
          <TierHeroes tier={activeTab} />
        </div>
      </div>
    </SecondLayout>
  );
};

export default TiersPage;
