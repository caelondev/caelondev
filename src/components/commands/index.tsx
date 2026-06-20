import type React from "react";
import Help from "./Help";
import Restart from "./Restart";

export type Categories = "info" | "utils";

interface Command {
  category: Categories;
  component: (args: string[]) => React.ReactNode;
}

export const commands: Record<string, Command> = {
  help: { category: "info", component: () => <Help /> },
  restart: { category: "utils", component: () => <Restart /> },
  clear: { category: "utils", component: () => <></> },
};
