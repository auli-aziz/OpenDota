import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react"; // correct type

const SecondLayout = ({
  children,
  logo: Logo, // PascalCase for components
  title,
  description,
  heading,
  subheading,
}: {
  children: ReactNode;
  logo: LucideIcon; // now correctly typed as a component
  title: string;
  description: string;
  heading: string;
  subheading: string;
}) => {
  return (
    <div>
      <div className="mb-9 flex w-full flex-col gap-y-1">
        <div className="text-secondary flex h-12 items-center gap-6">
          <Logo className="h-10 w-10" /> {/* use component */}
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        <p className="text-text-primary mt-1 text-xl">{description}</p>
      </div>
      <div className="border-border-tertiary h-fit rounded-xl border-2">
        <div className="border-border-tertiary from-background-secondary to-background-tertiary flex flex-col gap-y-1 border-b bg-gradient-to-tr px-8 py-10">
          <h1 className="text-secondary text-3xl font-bold">{heading}</h1>
          <p className="text-text-primary mt-1 text-lg">{subheading}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SecondLayout;
