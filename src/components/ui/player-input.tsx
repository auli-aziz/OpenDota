import { Search } from "lucide-react";
import React from "react";

const Input = () => {
  return (
    <div className="flex h-13 gap-3">
      <input
        placeholder="Enter Player Account ID"
        className="border-border-primary bg-background-secondary text-text-primary h-full w-[400px] rounded-xl border-2 px-5 py-0.5"
      />
      <button className="from-primary hover:to-primary flex h-full items-center gap-4 rounded-xl bg-gradient-to-b to-red-900 px-7 font-semibold hover:from-red-900">
        <Search className="h-5 w-5" />
        Search
      </button>
    </div>
  );
};

export default Input;
