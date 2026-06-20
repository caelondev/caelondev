import styles from "./Skills.module.css";

interface SkillCategory {
  title: string;
  items: string[];
  note?: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    items: ["Rust", "Zig", "Go", "C", "TypeScript", "JavaScript", "GDScript"],
    note: "#0 Rust glazer babyyy.",
  },
  {
    title: "Backend",
    items: ["Node.js", "MongoDB", "Mongoose", "REST"],
    note: "Built bots and backend projects with modular architectures.",
  },
  {
    title: "Game Development",
    items: ["Godot", "Scene Trees", "Signals"],
    note: "Tinkering with small game systems and mechanics on the side.",
  },
  {
    title: "Low-Level & Systems",
    items: ["Virtual Machines", "Parsers", "LLVM"],
    note: "Digging into how interpreters and compilers actually work under the hood.",
  },
  {
    title: "Tooling",
    items: [
      "Neovim",
      "LazyVim",
      "Git",
      "Lazygit",
      "Vercel",
      "Railway",
      "Render",
    ],
  },
  {
    title: "Interests",
    items: ["Language Design", "CS Theory", "Architecture"],
    note: "Why software behaves the way it does, not just that it does.",
  },
  {
    title: "Currently Exploring",
    items: ["LLVM IR", "Type Systems", "Encoders & Decoders"],
    note: "Always chasing the next rabbit hole.",
  },
];

export default function Skills() {
  return (
    <section className={styles.skills}>
      <h1 className={styles.heading}>Skills:</h1>
      <div className={styles.grid}>
        {SKILL_CATEGORIES.map((cat) => (
          <div className={styles.card} key={cat.title}>
            <h3 className={styles.cardTitle}>{cat.title}</h3>
            <ul className={styles.itemList}>
              {cat.items.map((item) => (
                <li className={styles.item} key={item}>
                  {item}
                </li>
              ))}
            </ul>
            {cat.note && <p className={styles.note}>{cat.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
