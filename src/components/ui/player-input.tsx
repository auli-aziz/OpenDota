import { Search, User } from "lucide-react";
import React, { forwardRef } from "react";

type InputProps = {
  setAccountId: () => void;
};

const PlayerInput = forwardRef<HTMLInputElement, InputProps>(
  ({ setAccountId }, ref) => {

    return (
      <div className="flex h-12 w-full gap-3">
        <div className="relative w-full">
          <User className="text-text-primary absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            ref={ref}
            placeholder="Enter Player Account ID"
            className="border-border-primary bg-background-tertiary text-text-primary h-full w-full rounded-xl border-2 py-0.5 pr-5 pl-12 text-lg"
          />
        </div>
        <button
          onClick={setAccountId}
          className="from-primary hover:to-primary flex h-full items-center gap-4 rounded-xl bg-gradient-to-b to-red-900 px-7 text-xl font-semibold hover:from-red-900"
        >
          <Search className="h-full w-5" />
          Search
        </button>
      </div>
    );
  }
);

PlayerInput.displayName = "PlayerInput";

export default PlayerInput;
