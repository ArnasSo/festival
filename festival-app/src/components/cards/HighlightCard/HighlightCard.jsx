import styles from "./HighlightCard.module.css";

export default function HighlightCard({ label, image, onClick, disabled = false }) {
  return (
    <button
      className={styles.card}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <img className={styles.image} src={image} alt="" />
      <span className={styles.label}>{label}</span>
    </button>
  );
}