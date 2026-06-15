import type { BaseProps } from "../types";

export default function Empty({ onDone }: BaseProps) {
  onDone?.();
  return <div>&nbsp;</div>;
}
