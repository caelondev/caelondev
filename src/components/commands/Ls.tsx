import { SECTIONS } from ".";

export default function Ls() {
  const sections: React.ReactNode[] = [<p>/</p>];

  for (const section of Object.keys(SECTIONS)) {
    sections.push(<p>{section}/</p>);
  }

  return sections;
}
