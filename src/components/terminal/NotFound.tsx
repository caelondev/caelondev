import { useEffect } from "react";
import type { BaseProps } from "../../types";
import ClickableCommand from "./ClickableCommand";
import type { CommandPromptHandle } from "./CommandPrompt";

type Props = BaseProps & {
  cmdName: string;
  promptRef: React.RefObject<CommandPromptHandle | null>;
};

export default function NotFound({ cmdName, promptRef, onDone }: Props) {
  useEffect(() => {
    onDone?.();
  }, []);
  return (
    <p>
      <p>Command '{cmdName}' not found.</p>
      <p>
        Type <ClickableCommand command="help" promptRef={promptRef} /> to list
        all commands{" "}
      </p>
    </p>
  );
}
