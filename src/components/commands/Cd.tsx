import { SECTIONS } from ".";
import type { CommandMetadata } from "../../types";

const ROOT_ID = "main";

function normalize(path: string): string {
  return path.replace(/^\/+/, "").replace(/\/+$/, "");
}

function goToSection(target: string): boolean {
  const id = target === "" || target === ".." ? ROOT_ID : SECTIONS[target];
  if (!id) return false;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return true;
}

export default function Cd({ args }: CommandMetadata) {
  const raw = args?.[0];

  if (!raw) {
    setTimeout(() => goToSection(""), 300);
    return <></>;
  }

  const path = normalize(raw);
  const found = goToSection(path);

  if (!found) {
    return (
      <p>
        cd: no such section: {raw}
        <br />
        type 'ls' to list all sections
      </p>
    );
  }

  return <></>;
}
