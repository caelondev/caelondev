import { useContext, useEffect } from "react";
import { TerminalContext } from "../Terminal/TerminalContext.tsx";

export default function Restart() {
  const { reboot, lockInput } = useContext(TerminalContext)!;

  useEffect(() => {
    lockInput();
    const t = setTimeout(reboot, 500);
    return () => clearTimeout(t);
  }, [reboot, lockInput]);

  return <p>rebooting system...</p>;
}
