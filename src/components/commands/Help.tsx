import { useEffect } from "react";
import { commands, funCommands, specialCommands } from ".";
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
      <Empty />
      <p style={{ color: "var(--cyan)" }}>Fun commands:</p>
      {Object.keys(funCommands).map((c, i) => (
        <p>
          <ClickableCommand command={c} key={i} promptRef={promptRef} />
        </p>
      ))}
    </p>
  );
}
