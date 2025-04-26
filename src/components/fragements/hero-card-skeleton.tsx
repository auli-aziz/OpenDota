const HeroCardSkeleton = () => {
  return (
    <div className="animate-pulse w-full rounded-xl border-2 border-border-primary bg-background-secondary">
      <div className="h-48 w-full bg-background-tertiary" />
      <div className="space-y-3 p-4">
        <div className="h-6 w-2/3 rounded bg-background-tertiary" />
        <div className="h-4 w-full rounded bg-background-tertiary" />
        <div className="h-4 w-5/6 rounded bg-background-tertiary" />
      </div>
    </div>
  );
};

export default HeroCardSkeleton;
