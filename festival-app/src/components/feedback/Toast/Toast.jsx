import styles from "./Toast.module.css";

export default function Toast({ message, inline = false }) {
  return (
    <div className={`${styles.toast} ${inline ? styles.inline : ""}`}>
      {message}
    </div>
  );
}