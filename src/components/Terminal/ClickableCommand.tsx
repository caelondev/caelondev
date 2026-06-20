import styles from "./Terminal.module.css";
import { useTerminal } from "./TerminalContext.tsx";

const AUTO_TYPE_SPEED = 80;
const SUBMIT_DELAY = 200;

interface ClickableCommandProps {
  command: string;
  label?: string;
}

export default function ClickableCommand({
  command,
  label,
}: ClickableCommandProps) {
  const { inputRef, submitCommand, locked, lockInput, unlockInput } =
    useTerminal();

  const handleClick = () => {
    if (locked) return;
    lockInput();

    if (inputRef.current) inputRef.current.textContent = "";

    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      if (inputRef.current) {
        inputRef.current.textContent = command.slice(0, i);
      }
      if (i >= command.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          submitCommand(...command.trim().split(/\s+/).filter(Boolean));
          unlockInput();
        }, SUBMIT_DELAY);
      }
    }, AUTO_TYPE_SPEED);
  };

  return (
    <span
      className={styles["clickable-command"]}
      data-no-focus
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {label ?? command}
    </span>
  );
}
