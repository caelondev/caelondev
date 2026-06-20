import type { Card } from "../../types";
import styles from "./CoolPeople.module.css";

interface CoolPerson {
  name: string;
  description: string;
  links: string[];
}

const COOL_PEOPLE_LIST: CoolPerson[] = [
  {
    name: "caelondev",
    description: "yes, i'm kewl... i think...",
    links: ["https://caelondev.is-a.dev", "https://github.com/caelondev"],
  },
  {
    name: "StarloExoliz",
    description: "cool programmer, does creative stuff obv :3",
    links: ["https://codeberg.org/Kazooki123"],
  },
];

export default function CoolPeople({ id }: Card) {
  return (
    <section className={styles.coolPeople} id={id}>
      <h2 className={styles.title}>Cool People:</h2>
      <div className={styles.grid}>
        {COOL_PEOPLE_LIST.map((person) => (
          <div key={person.name} className={styles.card}>
            <h3 className={styles.name}>{person.name}</h3>
            <p className={styles.description}>{person.description}</p>
            <div className={styles.links}>
              {person.links.map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {new URL(link).hostname}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
