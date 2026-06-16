import { useRef } from "react";
import { type CommandPromptHandle } from "./CommandPrompt";

interface Props {
  command: string;
  promptRef: React.RefObject<CommandPromptHandle | null>;
}

export default function ClickableCommand({ command, promptRef }: Props) {
  const isExecutingRef = useRef(false);

  const handleClick = () => {
    if (isExecutingRef.current) return;
    isExecutingRef.current = true;
    promptRef.current?.execute(command);
    setTimeout(
      () => {
        isExecutingRef.current = false;
      },
      command.length * 80 + 500,
    );
  };

  return (
    <span style={{ color: "var(--foreground)", backgroundColor: "var(--background)" }}>
      {"["}
      <button
        className="clickable-command"
        onClick={handleClick}
        title="Click to run"
      >
        {command}
      </button>
      {"]"}
    </span>
  );
}
