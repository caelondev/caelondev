import type { CommandContext } from "../../types";

export function Github({}: CommandContext) {
  setTimeout(() => {
    window.open("https://github.com/caelondev", "_blank");
  }, 500);
  return <p style={{ color: "var(--blue)" }}>Redirecting...</p>;
}
