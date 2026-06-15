import type { CSSProperties } from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  style?: CSSProperties;
  className: string;
}

export default function Link({ href, children, style, className }: LinkProps) {
  return (
    <span>
      {"<"}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={style}
        className={`clickable-command ${className}`}
      >
        {children}
      </a>
      {">"}
    </span>
  )!;
}
