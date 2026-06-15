import type React from "react";
import type { BaseProps } from "../../types";
import { useEffect } from "react";

type Props = BaseProps & {
  output: React.ReactNode[];
};

export function Stdout({ output, onDone }: Props) {
  useEffect(() => {
    onDone?.();
  }, []);
  return <div className="terminal-output">{output}</div>;
}
