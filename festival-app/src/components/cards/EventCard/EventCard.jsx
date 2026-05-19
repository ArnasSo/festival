import HeartButton from "../../ui/HeartButton/HeartButton";
import styles from "./EventCard.module.css";

export default function EventCard({
  title,
  time,
  location,
  imgSmUrl,
  onClick,
  isSaved,
  toggleSaved,
  isFirst,
  isLast,
  isSingle,
}) {
  const cardClasses = `
    ${styles.card}
    ${isSingle ? styles.single : ""}
    ${isFirst && !isSingle ? styles.first : ""}
    ${isLast && !isSingle ? styles.last : ""}
    ${!isFirst && !isLast && !isSingle ? styles.middle : ""}
  `;

  return (
    <article className={cardClasses}>
      <button className={styles.content} onClick={onClick}>
        <img className={styles.image} src={imgSmUrl} alt={title} />

        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.meta}>{time}</p>
          <p className={styles.meta}>{location}</p>
        </div>
      </button>

      <div className={styles.heart}>
        <HeartButton saved={isSaved} toggleSaved={toggleSaved} />
      </div>
    </article>
  );
}