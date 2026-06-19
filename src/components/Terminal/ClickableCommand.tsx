import { useState, type RefObject } from "react";
import styles from "./Terminal.module.css";

const AUTO_TYPE_SPEED = 80;
const SUBMIT_DELAY = 200;

interface ClickableCommandProps {
  command: string;
  label?: string;
  inputRef: RefObject<HTMLSpanElement | null>;
  onSubmit: (command: string) => void;
}

export default function ClickableCommand({
  command,
  label,
  inputRef,
  onSubmit,
}: ClickableCommandProps) {
  const [typing, setTyping] = useState(false);

  const handleClick = () => {
    if (typing) return;
    setTyping(true);
    inputRef.current?.focus();
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
          onSubmit(command);
          setTyping(false);
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
