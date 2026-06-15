import type { CommandPromptHandle } from "./components/terminal/CommandPrompt";

export interface BaseProps {
  onDone?: () => void;
}

export type CommandContext = BaseProps & {
  promptRef: React.RefObject<CommandPromptHandle | null>;
};
