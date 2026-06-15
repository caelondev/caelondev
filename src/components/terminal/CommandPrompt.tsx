import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface CommandPromptHandle {
  fill: (value: string) => void;
  execute: (value: string) => void;
}

interface Props {
  onExecute?: (command: string) => void;
  autoFocus?: boolean;
}

const CommandPrompt = forwardRef<CommandPromptHandle, Props>(
  ({ onExecute, autoFocus = true }, ref) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const isTypingRef = useRef(false);

    const focusEnd = () => {
      const el = spanRef.current;
      if (!el) return;
      el.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    };

    useEffect(() => {
      if (autoFocus) focusEnd();

      const handleClick = () => focusEnd();
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }, [autoFocus]);

    const getText = () => spanRef.current?.innerText ?? "";

    const setText = (val: string) => {
      if (!spanRef.current) return;
      spanRef.current.innerText = val;
      focusEnd();
    };

    const submit = (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;
      onExecute?.(trimmed);
      setText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!isTypingRef.current) submit(getText());
      }
    };

    const autoType = (val: string, onDone?: () => void) => {
      isTypingRef.current = true;
      setText("");
      let i = 0;
      const interval = setInterval(() => {
        if (!spanRef.current) return clearInterval(interval);
        spanRef.current.innerText = val.slice(0, i + 1);
        focusEnd();
        i++;
        if (i >= val.length) {
          clearInterval(interval);
          isTypingRef.current = false;
          onDone?.();
        }
      }, 80);
    };

    useImperativeHandle(ref, () => ({
      fill(val: string) {
        autoType(val);
      },
      execute(val: string) {
        autoType(val, () => {
          setTimeout(() => submit(val), 300);
        });
      },
    }));

    return (
      <p className="command-line">
        <span className="user-field">guest@caelondev</span>
        <span style={{ color: "var(--red)" }}> $ </span>
        <span
          ref={spanRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          spellCheck={false}
          style={{
            outline: "none",
            caretColor: "var(--red, #ff5555)",
            minWidth: "1ch",
            display: "inline",
            whiteSpace: "pre",
          }}
        />
      </p>
    );
  },
);

CommandPrompt.displayName = "CommandPrompt";
export default CommandPrompt;
