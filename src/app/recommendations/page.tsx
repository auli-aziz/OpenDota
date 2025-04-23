import { Users } from "lucide-react";

const SuggestionPage = () => {
  return <div><div className="mb-9 flex w-full flex-col gap-y-1">
  <div className="text-secondary flex h-12 items-center gap-6">
    <Users className="h-10 w-10" />
    <h1 className="text-4xl font-bold">Player Hero Recommendations</h1>
  </div>
  <p className="text-text-primary mt-1 text-xl">Get personalized hero recommendations based on your play history and performance</p>
</div></div>;
};

export default SuggestionPage;
