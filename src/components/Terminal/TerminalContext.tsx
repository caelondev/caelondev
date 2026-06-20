import { createContext, useContext, type RefObject } from "react";

interface TerminalContextValue {
  inputRef: RefObject<HTMLSpanElement | null>;
  submitCommand: (...command: string[]) => void;
  locked: boolean;
  lockInput: ()=>void;
  unlockInput: ()=>void;
  reboot: ()=>void
}

export const TerminalContext = createContext<TerminalContextValue | null>(null);

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx)
    throw new Error("useTerminal must be used within TerminalContext.Provider");
  return ctx;
}
