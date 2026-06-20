import type { Card } from "../../types";
import styles from "./MainCard.module.css";

export default function MainCard({ id }: Card) {
  return (
    <div className={styles.main_card} id={id}>
      <img
        className={styles.caelon_cat}
        src="/caelondev/caelon-cat.jpg"
        alt="caelon cat profile picture"
      />
      <h1 className={styles.headline}>I am Jericho. aka caelondev</h1>
      <p className={styles.description}>
        a back-end developer and a low-level systems enthusiast
      </p>
    </div>
  );
}
