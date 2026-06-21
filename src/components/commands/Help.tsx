import { commands, type Categories } from ".";
import type { CommandMetadata } from "../../types";
import ClickableCommand from "../Terminal/ClickableCommand";

export default function Help({ args }: CommandMetadata) {
  const cmds: Partial<Record<Categories, string[]>> = {};

  if (args?.[0]) {
    let cmdName = args[0].toLowerCase();
    let cmd = commands[cmdName];

    if (!cmd) {
      return (
        <>
          <p>help: no such command: {cmdName}</p>
          <p>
            type <ClickableCommand command="help" /> to list all commands
          </p>
        </>
      );
    }

    let details = Array.isArray(cmd.helpDetails) ? cmd.helpDetails : [];

    return (
      <>
        <p>
          syntax: {cmdName} {cmd.arguments}
        </p>
        <p>
          {details.map((d) => (
            <p>{d}</p>
          ))}
        </p>
        <></>
      </>
    );
  }

  for (const [name, metadata] of Object.entries(commands)) {
    if (!Array.isArray(cmds[metadata.category])) cmds[metadata.category] = [];

    cmds[metadata.category]?.push(name);
  }

  return (
    <>
      <p>List of all commands:</p>
      {Object.entries(cmds).map(([cat, names]) => {
        return (
          <>
            <p style={{ marginTop: "10px" }}>{cat}:</p>
            {names.map((n) => (
              <div>
                <ClickableCommand command={n} key={n} />
              </div>
            ))}
          </>
        );
      })}
    </>
  );
}
