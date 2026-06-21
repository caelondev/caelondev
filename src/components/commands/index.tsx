import type React from "react";
import Help from "./Help";
import Restart from "./Restart";
import Cd from "./Cd";
import Ls from "./Ls";
import type { CommandMetadata } from "../../types";
import TicTacToe from "./TicTacToe";

export type Categories = "info" | "utils" | "fun";

interface Command {
  category: Categories;
  arguments: string;
  component: (metadata: CommandMetadata) => React.ReactNode;
  helpDetails: string | string[];
}

export const commands: Record<string, Command> = {
  ls: {
    category: "info",
    arguments: "",
    helpDetails: "Lists all sections",
    component: () => <Ls />,
  },
  help: {
    category: "info",
    arguments: "(command)",
    helpDetails: "Sends this help list",
    component: (metadata: CommandMetadata) => <Help args={metadata.args} />,
  },
  restart: {
    category: "utils",
    arguments: "",
    helpDetails: "Reboots the terminal",
    component: () => <Restart />,
  },
  clear: {
    category: "utils",
    arguments: "",
    helpDetails: "Clears the terminal output",
    component: () => <></>,
  },
  cd: {
    category: "utils",
    arguments: "(section)",
    helpDetails: [
      "Scrolls to a section in the portfolio",
      "defaults to '/' (Hero) when there's no section passed",
    ],
    component: (metadata: CommandMetadata) => <Cd args={metadata.args} />,
  },

  tictactoe: {
    category: "fun",
    arguments: "(--spectate)",
    helpDetails: [
      "Play a game of Tic-Tac-Toe with a hard AI. Good luck",
      "--spectate: Spectate two AIs playing Tic-Tac-Toe",
    ],
    component: (metadata: CommandMetadata) => (
      <TicTacToe args={metadata.args} />
    ),
  },
};

export const SECTIONS: Record<string, string> = {
  about: "about",
  skills: "skills",
  projects: "projects",
  "cool-people": "cool-people",
};
