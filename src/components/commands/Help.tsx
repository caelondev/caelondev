import { commands, type Categories } from ".";
import ClickableCommand from "../Terminal/ClickableCommand";

export default function Help() {
  const cmds: Partial<Record<Categories, string[]>> = {};

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
