import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

const SecondLayout = ({
  children,
  logo: Logo,
  title,
  description,
  heading,
  subheading,
}: {
  children: ReactNode;
  logo: LucideIcon;
  title: string;
  description: string;
  heading: string;
  subheading: string;
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-9 flex w-full flex-col gap-y-2">
        <div className="text-secondary flex items-center gap-4 sm:gap-6 h-10 sm:h-12">
          <Logo className="h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="text-2xl sm:text-4xl font-bold gold-shadow-text">{title}</h1>
        </div>
        <p className="text-text-primary mt-2 text-base sm:text-xl">{description}</p>
      </div>
      <div className="border-border-tertiary rounded-xl border-2 overflow-hidden">
        <div className="border-border-tertiary bg-gradient-to-tr from-background-secondary to-background-tertiary flex flex-col gap-y-2 border-b px-6 py-8 sm:px-8 sm:py-10">
          <h1 className="text-secondary text-2xl sm:text-3xl font-bold gold-shadow-text">{heading}</h1>
          <p className="text-text-primary mt-1 text-base sm:text-lg">{subheading}</p>
        </div>
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SecondLayout;
