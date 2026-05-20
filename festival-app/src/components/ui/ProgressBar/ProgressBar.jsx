import styles from "./ProgressBar.module.css";
// our reusable progress bar component used inside highlight overlay
export default function ProgressBar({ active, completed }) {
  // both props are booleans
  return (
    <div className={styles.track}>
      <div
        className={`
          ${styles.fill}
          ${active ? styles.active : ""}
          ${completed ? styles.completed : ""}
        `}
        //syntax above is an "easy" :D way to combine multiple css classes
        // we are saying ALWAYS apply styles.fill
        // then we have 2 conditional (ternary) styles 
        // one is for active, another is for completed..
      />
    </div>
  );
}