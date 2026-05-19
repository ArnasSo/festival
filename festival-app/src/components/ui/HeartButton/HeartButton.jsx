import heartIcon from "../../../assets/icon/heart.svg";
import heartFilledIcon from "../../../assets/icon/heart-filled.svg";
import styles from "./HeartButton.module.css";

export default function HeartButton({ saved, toggleSaved, customIcon }) {
  return (
    <button
      className={styles.heartButton}
      onClick={(event) => {
        event.stopPropagation();
        toggleSaved();
      }}
      aria-label={saved ? "Remove from my plan" : "Add to my plan"}
    >
      <img
        className={styles.icon}
        src={saved ? heartFilledIcon : customIcon || heartIcon}
        alt=""
      />
    </button>
  );
}