import Link from "../Link";
import Empty from "../Empty";
import type { CommandContext } from "../../types";

export const projects = [
  {
    name: "vyn",
    href: "https://github.com/vyn-lang/vyn",
    desc: "A statically typed, interpreted language written in Rust. Features a register-based VM and compiles to bytecode.",
    detail:
      "Built with a register-based VM that compiles source to bytecode. Statically typed with type inference. Written entirely in Rust.",
  },
  {
    name: "zast",
    href: "https://github.com/zast-lang/zast",
    desc: "A compiled language written in Rust with an LLVM backend.",
    detail: "Compiles directly to native code via LLVM. Written in Rust.",
  },
  {
    name: "theophilusx",
    href: "https://github.com/TheophilusWorks/TheophilusX",
    desc: "A multiplatform bot using the adapter pattern for easy platform mountability.",
    detail:
      "Uses the adapter pattern so adding a new platform is just implementing one interface. Currently supports multiple platforms.",
  },
  {
    name: "conduit",
    href: "https://github.com/TheophilusWorks/conduit",
    desc: "A type-safe FCA wrapper built on top of an unofficial Facebook API fork.",
    detail:
      "Wraps an unofficial Facebook API with full type safety. Built as a library for TheophilusX.",
  },
];

export default function Projects({ args }: CommandContext) {
  // project <name>
  if (args.length > 0) {
    const match = projects.find((p) => p.name === args[0].toLowerCase());

    if (!match) {
      return (
        <p>
          project <span style={{ color: "var(--magenta)" }}>{args[0]}</span> not
          found. type <span style={{ color: "var(--blue)" }}>projects</span> to
          see all.
        </p>
      );
    }

    return (
      <>
        <p>
          <Link href={match.href} className="project-name">
            {match.name}
          </Link>
          {" — "}
          {match.desc}
        </p>
        <Empty />
        <p>{match.detail}</p>
        <Empty />
        <p>
          <Link href={match.href} className="contact-platform-link">
            {match.href}
          </Link>
        </p>
      </>
    );
  }

  // projects
  return (
    <>
      <p>Here are my projects:</p>
      <Empty />

      {projects.map((project) => (
        <div key={project.name}>
          <p>
            <Link href={project.href} className="project-name">
              {project.name}
            </Link>
            {" — "}
            {project.desc}
          </p>
          <Empty />
        </div>
      ))}

      <p style={{ color: "var(--comment)" }}>
        tip: type{" "}
        <span style={{ color: "var(--blue)" }}>project &lt;name&gt;</span> for
        more details.
      </p>
    </>
  );
}
