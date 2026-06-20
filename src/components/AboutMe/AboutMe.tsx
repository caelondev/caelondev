import type { Card } from "../../types";
import { Type } from "../helpers/Type";
import styles from "./AboutMe.module.css";

export default function AboutMe({ id }: Card) {
  return (
    <div className={styles.about_me} id={id}>
      <h1>About Me:</h1>

      <p>
        I’m Jericho, aka caelondev. A programmer from the Philippines. I started
        my coding journey at 13 out of pure boredom, then never really stopped.
      </p>

      <p className={styles.typing_line}>
        I build small, weird, and useful things
        <Type
          strings={[
            "... I think...",
            "... probably...",
            "... sometimes too much...",
            "... maybe...",
          ]}
          startDelay={2000}
          typeSpeed={50}
          backSpeed={90}
          backDelay={2000}
          loop
        />
      </p>
    </div>
  );
}
