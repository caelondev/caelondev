import { useRef, useState } from "react";
import Empty from "./components/Empty";
import Sequence from "./components/Sequence";
import Caelondev from "./components/terminal/Caelondev";
import Type from "./components/terminal/Type";
import TypeCommand from "./components/terminal/TypeCommand";
import CommandPrompt, {
  type CommandPromptHandle,
} from "./components/terminal/CommandPrompt";
import ClickableCommand from "./components/terminal/ClickableCommand";
import { commands, funCommands } from "./components/commands";
import NotFound from "./components/terminal/NotFound";
import { Stdout } from "./components/terminal/Stdout";

function App() {
  const promptRef = useRef<CommandPromptHandle>(null);
  const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);

  const handleExecute = (commandRaw: string) => {
    let tokens = commandRaw.trim().split(/\s+/);
    let command = tokens[0].toLowerCase();
    let args = tokens.slice(1);

    if (!command) return;

    if (command === "clear") {
      setTerminalOutput([]);
      return;
    }

    const cmd = { ...funCommands, ...commands }?.[command];
    const out = cmd ? (
      <p>{cmd({ promptRef, args })}</p>
    ) : (
      <NotFound cmdName={command} promptRef={promptRef} />
    );

    setTerminalOutput((prev) => [
      ...prev,
      <p className="command-line">
        <p key={`cmd-${prev.length}`}>
          <span className="user-field">guest@caelondev</span>{" "}
          <span style={{ color: "var(--red)" }}>$ </span>
          <span style={{ color: "var(--yellow)" }}>{commandRaw}</span>
        </p>
      </p>,
      out,
    ]);
  };

  return (
    <Sequence>
      <TypeCommand value="start" speed={150} style={{ margin: "0" }} />
      <Caelondev />

      <Type speed={30}>
        <p className="description">
          Hello, I'm Jericho, also known as caelondev.
        </p>
        <Empty />

        <p className="description">
          I'm a backend developer and low-level systems enthusiast.
        </p>
        <Empty />

        <p className="description">
          Type <ClickableCommand command="help" promptRef={promptRef} /> or{" "}
          <ClickableCommand command="projects" promptRef={promptRef} /> to
          explore my portfolio.
        </p>
      </Type>

      <Stdout output={terminalOutput} />

      <CommandPrompt ref={promptRef} onExecute={handleExecute} />
    </Sequence>
  );
}

export default App;
