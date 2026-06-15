import type React from "react";
import Help from "./Help";
import type { CommandContext } from "../../types";

export const commands: Record<string, (ctx: CommandContext) => React.ReactNode> = {
  help: (ctx) => <Help promptRef={ctx.promptRef}/>,
};

export const specialCommands: Record<string, unknown> = {
  clear: undefined
}
