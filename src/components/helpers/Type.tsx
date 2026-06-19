import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypeProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  startDelay?: number;
  backDelay?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

export function Type({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  startDelay = 0,
  backDelay = 1000,
  className = "",
  showCursor = true,
  cursorChar = "|",
}: TypeProps) {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (!el.current) return;

    let typedInstance: Typed | null = null;

    el.current.innerHTML = "";

    const timeout = setTimeout(() => {
      if (!el.current) return;
      typedInstance = new Typed(el.current!, {
        strings,
        typeSpeed,
        backSpeed,
        loop,
        startDelay,
        backDelay,
        showCursor,
        cursorChar,
      });

      typed.current = typedInstance;
    }, 100);

    return () => {
      clearTimeout(timeout);
      typedInstance?.destroy();
      typed.current = null;

      if (el.current) el.current.innerHTML = "";
    };
  }, [
    strings,
    typeSpeed,
    backSpeed,
    loop,
    startDelay,
    backDelay,
    showCursor,
    cursorChar,
  ]);

  return <span ref={el} className={className} />;
}
