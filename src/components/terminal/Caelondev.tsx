import { useEffect } from "react";
import type { BaseProps } from "../../types";

let asciiArtRaw = `
 ██████╗ █████╗ ███████╗██╗      ██████╗ ███╗   ██╗██████╗ ███████╗██╗   ██╗
██╔════╝██╔══██╗██╔════╝██║     ██╔═══██╗████╗  ██║██╔══██╗██╔════╝██║   ██║
██║     ███████║█████╗  ██║     ██║   ██║██╔██╗ ██║██║  ██║█████╗  ██║   ██║
██║     ██╔══██║██╔══╝  ██║     ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╗██║  ██║███████╗███████╗╚██████╔╝██║ ╚████║██████╔╝███████╗ ╚████╔╝ 
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝  ╚═══╝  
`;

const asciiArt = asciiArtRaw
  .split("\n")
  .map((line) => line.replaceAll(" ", "░"))
  .join("\n");

export default function Caelondev({ onDone }: BaseProps) {
  useEffect(() => {
    const t = setTimeout(() => {
      onDone?.();
    }, 300);

    return () => clearTimeout(t);
  }, []);

  return <pre className="caelondev-ascii">{asciiArt}</pre>;
}
