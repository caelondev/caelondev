import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface Props {
  value: string;
  speed?: number;
  style?: React.CSSProperties;
  onDone?: () => void;
}

export default function TypeCommand({ value, speed = 30, onDone, style }: Props) {
  let ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(ref.current!, {
      strings: [value],
      typeSpeed: speed,
      onComplete: () => {
        typed.cursor.remove();
        onDone?.();
      },
    });

    return () => typed.destroy();
  }, []);

  return (
    <p className="command-line" style={style}>
      <span className="user-field">guess@caelondev</span>
      <span style={{ color: "var(--red)" }}> $ </span>
      <span ref={ref}></span>
    </p>
  );
}
