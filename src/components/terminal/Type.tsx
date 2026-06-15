import {
  useEffect,
  useState,
  isValidElement,
  Children,
  cloneElement,
  type ReactNode,
  type ReactElement,
} from "react";
import type { BaseProps } from "../../types";

type Props = BaseProps & {
  children: ReactNode;
  speed?: number;
};

function countChars(node: ReactNode): number {
  if (typeof node === "string" || typeof node === "number")
    return String(node).length;
  if (Array.isArray(node)) return node.reduce((s, c) => s + countChars(c), 0);
  if (isValidElement(node)) {
    const children = Children.toArray((node.props as any).children);
    return children.reduce((s: number, c) => s + countChars(c), 0);
  }
  return 0;
}

function rebuildTree(node: ReactNode, state: { remaining: number }): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    const text = String(node);
    if (state.remaining <= 0) return "";
    const visible = text.slice(0, state.remaining);
    state.remaining -= text.length;
    return visible;
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <span key={i}>{rebuildTree(child, state)}</span>
    ));
  }

  if (isValidElement(node)) {
    const charCount = countChars(node);

    if (charCount === 0) {
      if (state.remaining <= 0) return null;
      state.remaining -= 1;
      return node;
    }

    const children = Children.toArray((node.props as any).children);
    const rebuilt = children.map((child) => rebuildTree(child, state));
    return cloneElement(
      node as ReactElement,
      { ...(node.props as any) },
      ...rebuilt,
    );
  }

  return null;
}

export default function Type({ children, speed = 30, onDone }: Props) {
  const total = countChars(children) + countNonTextNodes(children);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= total) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setRevealed((r) => r + 1), speed);
    return () => clearTimeout(t);
  }, [revealed, total, speed]);

  return <>{rebuildTree(children, { remaining: revealed })}</>;
}

function countNonTextNodes(node: ReactNode): number {
  if (typeof node === "string" || typeof node === "number") return 0;
  if (Array.isArray(node))
    return node.reduce((s, c) => s + countNonTextNodes(c), 0);
  if (isValidElement(node)) {
    const children = Children.toArray((node.props as any).children);
    const charCount = countChars(node);
    if (charCount === 0) return 1;
    return children.reduce((s: number, c) => s + countNonTextNodes(c), 0);
  }
  return 0;
}
