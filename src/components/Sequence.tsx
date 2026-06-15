import {
  useState,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
} from "react";

interface Props {
  children: ReactNode;
}

export default function Sequence({ children }: Props) {
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  return (
    <>
      {items.map((child, i) => {
        if (i > active) return null;
        if (!isValidElement(child)) return child;
        return cloneElement(
          child as React.ReactElement<{ onDone: () => void }>,
          {
            key: i,
            onDone: i === active ? () => setActive((a) => a + 1) : undefined,
          },
        );
      })}
    </>
  );
}
