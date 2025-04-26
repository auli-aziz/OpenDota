import { SiDota2 } from "react-icons/si";
import Card from "~/components/ui/card";

export default function HomePage() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-5">
      <div className="flex flex-col items-center gap-y-4 text-center">
        <SiDota2 className="text-primary mb-4 h-14 w-14 sm:h-16 sm:w-16" />
        <h1 className="text-secondary gold-shadow-text text-3xl sm:text-5xl font-bold">
          Dota 2 Meta Dashboard
        </h1>
        <p className="text-lg sm:text-2xl max-w-2xl">
          Comprehensive statistical analysis of hero performance across all
          skill brackets, professional matches, and personalized recommendations
          for players.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center md:justify-between gap-6 py-10">
        <Card 
          image="/gold-wallpaper.jpg" 
          link="/pro-meta" 
          title="Pro Meta"
          description="View heroes with the highest pro statistics" 
        />
        <Card
          image="/red-wallpaper.jpg"
          link="/tiers"
          title="Tier Analysis"
          description="View top 10 best heroes for each tier"
        />
        <Card
          image="/blue-wallpaper.jpg"
          link="/recommendations"
          title="Recommendations"
          description="Get personalized hero recommendations"
        />
      </div>
    </div>
  );
}
