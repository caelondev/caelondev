import { useEffect } from "react";
import { commands, specialCommands } from ".";
import type { CommandContext } from "../../types";
import ClickableCommand from "../terminal/ClickableCommand";
import Empty from "../Empty";

export default function Help({ onDone, promptRef }: CommandContext) {
  let cmds = [...Object.keys(commands), ...Object.keys(specialCommands)];

  useEffect(() => {
    onDone?.();
  }, []);
  return (
    <p style={{ color: "var(--cyan)" }}>
      Available commands:
      <Empty />
      {cmds.map((c, i) => (
        <p>
          <ClickableCommand command={c} key={i} promptRef={promptRef} />
        </p>
      ))}
    </p>
  );
}
