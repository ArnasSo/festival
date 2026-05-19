import styles from "./ProgressBar.module.css";

export default function ProgressBar({ active, completed }) {
  return (
    <div className={styles.track}>
      <div
        className={`
          ${styles.fill}
          ${active ? styles.active : ""}
          ${completed ? styles.completed : ""}
        `}
      />
    </div>
  );
}