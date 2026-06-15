import type React from "react";
import Help from "./Help";
import type { CommandContext } from "../../types";
import Projects from "./Projects";
import { Github } from "./Github";
import Contact from "./Contact";
import Restart from "./Restart";
import Echo from "./Echo";

export const commands: Record<
  string,
  (ctx: CommandContext) => React.ReactNode
> = {
  help: (ctx) => <Help promptRef={ctx.promptRef} args={ctx.args} />,
  projects: (ctx) => <Projects promptRef={ctx.promptRef} args={ctx.args} />,
  github: (ctx) => <Github promptRef={ctx.promptRef} args={ctx.args} />,
  contact: (ctx) => <Contact promptRef={ctx.promptRef} args={ctx.args} />,
  restart: (ctx) => <Restart promptRef={ctx.promptRef} args={ctx.args} />,
};

export const specialCommands: Record<string, unknown> = {
  clear: undefined,
};

export const funCommands: Record<
  string,
  (ctx: CommandContext) => React.ReactNode
> = {
  echo: (ctx) => <Echo promptRef={ctx.promptRef} args={ctx.args} />,
};
