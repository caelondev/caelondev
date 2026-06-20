import styles from "./Projects.module.css";

interface Project {
  name: string;
  description: string;
  stack: string[];
  link?: string;
  status?: "active" | "inactive" | "archived";
}

const PROJECTS: Project[] = [
  {
    name: "TheophilusX",
    description: "A cool multi-platform bot with a bunch of features",
    stack: ["TypeScript", "MongoDB", "Discord.js"],
    link: "https://github.com/TheophilusWorks/TheophilusX/",
    status: "active",
  },
  {
    name: "Conduit",
    description:
      "An unoffial FCA TypeScript wrapper for TypeScript support",
    stack: ["TypeScript"],
    link: "https://github.com/TheophilusWorks/conduit",
    status: "active",
  },
  {
    name: "Vyn",
    description:
      "A statically-typed, bytecode-compiled, register-based programming language written in Rust",
    stack: ["Rust"],
    link: "https://github.com/vyn-lang/vyn",
    status: "inactive",
  },
  {
    name: "Super Striker",
    description:
      "A fast-paced soccer game built with custom physics and lightweight game logic",
    stack: ["GDScript", "Godot"],
    link: "https://github.com/caelondev/super-striker",
    status: "inactive",
  },
  {
    name: "Silver",
    description: "A simple node-based text formatter. mostly used for Discord bots messages but can also be used anywhere",
    stack: ["TypeScript"],
    link: "https://github.com/TheophilusWorks/silver",
    status: "inactive",
  }
];

export default function Projects() {
  return (
    <div className={styles.projects}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Projects:</h1>
        <div className={styles.grid}>
          {PROJECTS.map((p) => (
            <div className={styles.card} key={p.name}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{p.name}</h3>
                {p.status && (
                  <span className={styles[`status_${p.status}`]}>
                    {p.status === "active" ? "[ OK ]" : "[ ARCHIVED ]"}
                  </span>
                )}
              </div>
              <p className={styles.description}>{p.description}</p>
              <ul className={styles.stackList}>
                {p.stack.map((s) => (
                  <li className={styles.stackItem} key={s}>
                    {s}
                  </li>
                ))}
              </ul>
              {p.link && (
                <a
                  href={p.link}
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  $ view repo
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
