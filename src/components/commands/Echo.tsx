import type { CommandContext } from "../../types";

export default function Echo({ args }: CommandContext) {
  let msg = args.join(" ");
  return <p>{msg}</p>
}
