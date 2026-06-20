import type { Card } from "../../types";
import styles from "./CoolPeople.module.css";

interface CoolPerson {
  name: string;
  username?: string;
  description: string;
  links?: string[];
}

const COOL_PEOPLE_LIST: CoolPerson[] = [
  {
    name: "caelon",
    username: "caelondev",
    description: "yes, i'm kewl... i think...",
    links: ["https://caelondev.is-a.dev", "https://github.com/caelondev"],
  },
  {
    name: "StarloExoliz",
    username: "starloexoliz11",
    description: "cool programmer, does creative stuff obv :3",
    links: ["https://codeberg.org/Kazooki123"],
  },
  {
    name: "gseppo",
    username: "gseppo",
    description: '- "Woohoo"\nhe genuinely looks like a Counter Strike addict.',
  },
  {
    name: "Cart",
    username: "cart1416",
    description: "He likes linux",
    links: ["https://github.com/Cart1416"],
  },
  {
    name: "Zero",
    username: "yannlepigeon",
    description: "He's addicted to 'Soos The Huehue' he said.",
    links: ["https://github.com/YannLePigeon"],
  },
  {
    name: "ANW",
    username: "anormalwintrovert",
    description: "He made his own programming language called 'Lunite'",
    links: ["https://anw.is-a.dev"],
  },
  {
    name: "Chimera",
    username: "gamingchimera",
    description: "His portfolio looks cool",
    links: ["https://chimera.is-a.dev"],
  },
];

const DISCORD_USER_ID = "1264839050427367570";

export default function CoolPeople({ id }: Card) {
  return (
    <section className={styles.coolPeople} id={id}>
      <h2 className={styles.title}>Cool People:</h2>
      <div className={styles.grid}>
        {COOL_PEOPLE_LIST.map((person) => (
          <div key={person.name} className={styles.card}>
            <h3 className={styles.name}>{person.name}</h3>
            {person.username && (
              <p className={styles.username}>@{person.username}</p>
            )}
            <p className={styles.description}>{person.description}</p>
            <div className={styles.links}>
              {person.links?.map((link) => (
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
      <p className={styles.cta}>
        Want to be part of this wall? Message me on{" "}
        <a
          href={`https://discord.com/users/${DISCORD_USER_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.discordButton}
        >
          Discord
        </a>
      </p>
    </section>
  );
}
