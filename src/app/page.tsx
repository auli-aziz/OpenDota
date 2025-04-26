import { SiDota2 } from "react-icons/si";
import Card from "~/components/ui/card";

export default function HomePage() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center gap-y-3 px-44 text-center">
        <SiDota2 className="text-primary mb-5 h-16 w-16" />
        <h1 className="text-secondary gold-shadow-text text-5xl font-bold">
          Dota 2 Meta Dashboard
        </h1>
        <p className="text-2xl">
          Comprehensive statistical analysis of hero performance across all
          skill brackets, professional matches, and personalized recommendations
          for players.
        </p>
      </div>
      <div className="flex justify-between gap-5 py-10">
        <Card image={"/gold-wallpaper.jpg"} link="/pro-meta" title="Pro Meta"
        description="View heroes with the highest pro statistics" />
        <Card
          image={"/red-wallpaper.jpg"}
          link="/tiers"
          title="Tier Analysis"
          description="View top 10 best heroes for every each tier"
        />
        <Card
          image={"/blue-wallpaper.jpg"}
          link="/recommendations"
          title="Recommendations"
          description="Get personalized hero recommendations"
        />
      </div>
    </div>
  );
}
