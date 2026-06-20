import type React from "react";
import Help from "./Help";
import Restart from "./Restart";
import Cd from "./Cd";
import Ls from './Ls'
import type { CommandMetadata } from "../../types";

export type Categories = "info" | "utils";

interface Command {
  category: Categories;
  component: (metadata: CommandMetadata) => React.ReactNode;
}

export const commands: Record<string, Command> = {
  help: { category: "info", component: () => <Help /> },
  restart: { category: "utils", component: () => <Restart /> },
  clear: { category: "utils", component: () => <></> },
  ls: { category: "utils", component: () => <Ls/> },
  cd: {
    category: "utils",
    component: (metadata: CommandMetadata) => <Cd args={metadata.args} />,
  },
};

export const SECTIONS: Record<string, string> = {
  about: "about",
  skills: "skills",
  projects: "projects",
  "cool-people": "cool-people",
};
