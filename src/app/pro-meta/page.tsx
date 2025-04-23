import { Award } from "lucide-react";
import SecondLayout from "~/components/layouts/second-layout";

const TopHeroesPage = () => {
  return (
    <SecondLayout
      title="Professional Meta Analysis"
      logo={Award}
      description="Insights into the professional Dota 2 meta based on tournament matches and high-level play"
      heading="Professional Meta Analysis"
      subheading="Top heroes in professional matches based on pick or ban rate and win rate"
    >
      test
    </SecondLayout>
  );
};

export default TopHeroesPage;
