import {
  useRef,
  useState,
  useEffect,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import styles from "./Terminal.module.css";
import CaelondevFiglet from "../CaelondevFiglet.tsx";
import ClickableCommand from "./ClickableCommand.tsx";

const PROMPT = "caelondev@portfolio:~$";

type BootStatus = "ok" | "warn" | "fail" | null;

interface BootLine {
  text: string;
  status: BootStatus;
}

const BOOT_SEQUENCE: BootLine[] = [
  { text: "booting caelondev/portfolio...", status: null },
  { text: "mounting filesystem ~/about-me", status: "ok" },
  { text: "mounting filesystem ~/projects", status: "ok" },
  { text: "loading dependencies: react, vite", status: "ok" },
  { text: "checking for bugs", status: "warn" },
  { text: "found 0 bugs (suspicious)", status: "warn" },
  { text: "initializing caffeine levels", status: "fail" },
  { text: "retrying with more coffee", status: "ok" },
  { text: "boot complete.", status: "ok" },
];

const BOOT_LINE_DELAY = 350;
const BOOT_HOLD_DELAY = 700;

const STATUS_LABEL: Record<Exclude<BootStatus, null>, string> = {
  ok: "[ OK ]",
  warn: "[WARN]",
  fail: "[FAIL]",
};

const STATUS_CLASS: Record<Exclude<BootStatus, null>, string> = {
  ok: styles["status-ok"],
  warn: styles["status-warn"],
  fail: styles["status-fail"],
};

interface HistoryLine {
  command: string;
}

export default function Terminal() {
  const inputRef = useRef<HTMLSpanElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [bootLines, setBootLines] = useState<BootLine[]>([]);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    BOOT_SEQUENCE.forEach((line, i) => {
      const t = setTimeout(() => {
        setBootLines((prev) => [...prev, line]);
      }, i * BOOT_LINE_DELAY);
      timeouts.push(t);
    });

    const finish = setTimeout(
      () => {
        setBooting(false);
      },
      BOOT_SEQUENCE.length * BOOT_LINE_DELAY + BOOT_HOLD_DELAY,
    );
    timeouts.push(finish);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [bootLines, history]);

  const submitCommand = (command: string) => {
    setHistory((prev) => [...prev, { command }]);
    if (inputRef.current) inputRef.current.textContent = "";
  };

  const handleScreenClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-focus]")) return;
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = inputRef.current?.textContent ?? "";
      submitCommand(command);
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.titlebar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles["titlebar-label"]}>terminal</span>
      </div>

      <div
        className={styles.screen}
        ref={screenRef}
        onClick={handleScreenClick}
      >
        {booting ? (
          bootLines.map((line, i) => (
            <div className={styles["boot-line"]} key={i}>
              {line.status && (
                <span
                  className={`${styles.status} ${STATUS_CLASS[line.status]}`}
                >
                  {STATUS_LABEL[line.status]}
                </span>
              )}
              <span className={styles["boot-text"]}>{line.text}</span>
            </div>
          ))
        ) : (
          <>
            <CaelondevFiglet />
            <p className={styles["terminal-description"]}>
              Type{" "}
              <ClickableCommand
                command="help"
                inputRef={inputRef}
                onSubmit={submitCommand}
              />{" "}
              to navigate the terminal
            </p>
            {history.map((entry, i) => (
              <div className={styles.line} key={i}>
                <span className={styles.prompt}>{PROMPT}</span>
                {entry.command}
              </div>
            ))}

            <div className={styles.line}>
              <span className={styles.prompt}>{PROMPT}</span>
              <span
                ref={inputRef}
                className={styles.input}
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                role="textbox"
                aria-label="terminal input"
                onKeyDown={handleKeyDown}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
