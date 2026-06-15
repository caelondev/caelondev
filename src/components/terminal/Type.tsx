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

type Leaf = { text: string };

function collectLeaves(node: ReactNode): Leaf[] {
  if (typeof node === "string" || typeof node === "number") {
    return [{ text: String(node) }];
  }
  if (Array.isArray(node)) {
    return node.flatMap(collectLeaves);
  }
  if (isValidElement(node)) {
    return Children.toArray((node.props as any).children).flatMap(
      collectLeaves,
    );
  }
  return [];
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
  const leaves = collectLeaves(children);
  const total = leaves.reduce((sum, l) => sum + l.text.length, 0);
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
