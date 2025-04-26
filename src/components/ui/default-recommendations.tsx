import { SiDota2 } from "react-icons/si";
import type { HeroStats } from "~/types/heroes";

const DefaultRecommendations = ({
  loading,
  suggestedHeroes,
  error,
}: {
  loading: boolean;
  suggestedHeroes: HeroStats[];
  error: string | null;
}) => {
  return (
    <>
      {!loading && suggestedHeroes.length == 0 && !error && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="animate-float relative mb-8 h-24 w-24">
            <SiDota2 className="text-primary h-24 w-24 opacity-50" />
          </div>
          <p className="text-muted-foreground max-w-md">
            Enter a Dota 2 player account ID to see personalized hero
            recommendations based on your play history and current meta.
          </p>
        </div>
      )}
    </>
  );
};

export default DefaultRecommendations;
