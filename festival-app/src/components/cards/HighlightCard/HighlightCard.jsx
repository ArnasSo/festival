import styles from "./HighlightCard.module.css";

export default function HighlightCard({ label, image, onClick, disabled = false }) {
  // props
  // text
  // image
  // function on click
  // boolean, default false
  return (
    <button
      className={styles.card}
      onClick={onClick}
      disabled={disabled}
      // prevents clicking
      // for example after watching it will change to TRUE (default is false - so its NOT disabled)
      type="button"
      // just making sure there are no bugs by button accidentally trying to submit a form :D
    >
      <img className={styles.image} src={image} alt="" />
      <span className={styles.label}>{label}</span>
    </button>
  );
}