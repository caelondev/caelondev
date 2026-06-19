import styles from "./MainCard.module.css";

export default function MainCard() {
  return (
    <div className={styles.main_card}>
      <img
        className={styles.caelon_cat}
        src="/caelon-cat.jpg"
        alt="caelon cat profile picture"
      />
      <h1 className={styles.headline}>I am Jericho. aka caelondev</h1>
      <p className={styles.description}>
        a back-end developer and a low-level enthusiast
      </p>
      <p className={styles.description_blend}>
        I have an unhealthy amount of rust language addiction
      </p>
    </div>
  );
}
