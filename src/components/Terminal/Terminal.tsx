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
import { TerminalContext } from "./TerminalContext.tsx";
import { commands } from "../commands";
import type { Card } from "../../types.ts";

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
  command: string[];
  output: React.ReactNode;
}

export default function Terminal({ id }: Card) {
  const inputRef = useRef<HTMLSpanElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [bootLines, setBootLines] = useState<BootLine[]>([]);
  const [booting, setBooting] = useState(true);
  const [locked, setLocked] = useState(false);
  const [bootCycle, setBootCycle] = useState(0);

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
  }, [bootCycle]);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [bootLines, history]);

  const runCommand = (name: string, args: string[]): React.ReactNode => {
    const entry = commands[name];
    if (!entry) {
      return (
        <p className={styles["command-error"]}>command not found: {name}</p>
      );
    }
    return entry.component({ args });
  };

  const submitCommand = (...command: string[]) => {
    const [name, ...args] = command;

    if (inputRef.current) inputRef.current.textContent = "";

    if (name === "clear") {
      setHistory([]);
      return;
    }

    const output = runCommand(name, args);
    setHistory((prev) => [...prev, { command, output }]);
  };

  const handleScreenClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-focus]")) return;
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = inputRef.current?.textContent ?? "";
      const tokens = raw.trim().split(/\s+/).filter(Boolean);
      if (tokens.length === 0) return;
      submitCommand(...tokens);
    }
  };

  const lockInput = () => {
    inputRef.current?.blur();
    setLocked(true);
  };

  const unlockInput = () => setLocked(false);

  const reboot = () => {
    setHistory([]);
    setBootLines([]);
    setLocked(false);
    setBooting(true);
    setBootCycle((c) => c + 1);
  };

  return (
    <TerminalContext.Provider
      value={{
        inputRef,
        submitCommand,
        lockInput,
        unlockInput,
        locked,
        reboot,
      }}
    >
      <div className={styles.card} id={id}>
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
                  Type <ClickableCommand command="help" /> to navigate the
                  terminal
                </p>
                {history.map((entry, i) => (
                  <div className={styles["history-entry"]} key={i}>
                    <div className={styles.line}>
                      <span className={styles.prompt}>{PROMPT}</span>
                      {entry.command.join(" ")}
                    </div>
                    {entry.output}
                  </div>
                ))}

                <div className={`${styles.line} ${styles["input-line"]}`}>
                  <span className={styles.prompt}>{PROMPT}</span>
                  <span
                    ref={inputRef}
                    className={styles.input}
                    contentEditable={!locked}
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
      </div>
    </TerminalContext.Provider>
  );
}
