"use client";

import { CommandContext } from "./contexts";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CommandContext.Provider value={{ open: false }}>
      {children}
    </CommandContext.Provider>
  );
}
