import { useEffect, useRef, useState } from "react";
import init, { Brainfuck } from "../../../pkgs/brainfuck/bf_rust.js";
import styles from "./Bf.module.css";

export default function Bf() {
  const [source, setSource] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [ready, setReady] = useState(false);

  const stdinQueue = useRef<string[]>([]);

  useEffect(() => {
    async function load() {
      await init();

      // called from Rust for the ',' instruction
      (globalThis as any).bfRead = () => {
        return stdinQueue.current.shift() ?? "\0";
      };

      setReady(true);
    }

    load();
  }, []);

  async function run() {
    if (!ready) return;

    stdinQueue.current = stdin.split("");

    let out = "";

    (globalThis as any).bfWrite = (text: string) => {
      out += text;
    };

    try {
      const interpreter = new Brainfuck(source);
      await interpreter.run();
    } catch (err) {
      out += "\n" + String(err);
    }

    setOutput(out);
  }

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <label className={styles.label}>Program</label>
        <textarea
          className={styles.textarea}
          data-no-focus
          value={source}
          onChange={(e) => setSource(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Input</label>
        <input
          className={styles.input}
          data-no-focus
          type="text"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          placeholder="Input for ',' instruction"
        />
      </div>

      <button className={styles.button} onClick={() => run()} data-no-focus>
        Run
      </button>

      <div className={styles.group}>
        <label className={styles.label}>Output</label>
        <pre className={styles.output}>
          {output || "Program output will appear here..."}
        </pre>
      </div>
    </div>
  );
}
