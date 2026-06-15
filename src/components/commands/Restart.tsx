import type { CommandContext } from "../../types";

export default function Restart({}:CommandContext) {
  window.location.reload();
  return <></>;
}
