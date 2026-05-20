import HeartButton from "../../ui/HeartButton/HeartButton";
import styles from "./EventCard.module.css";

export default function EventCard({
  title,
  time,
  location,
  imgSmUrl,
  onClick,
  // function when card is clicked
  isSaved,
  // finding out if heart is clicked or not (state)
  toggleSaved,
  // save or unsave event (by clicking heart)
  isFirst,
  isLast,
  isSingle,
  // we use 3 props above to adjust styling of each card.
  // we want border radius for first and last and single event cards
  // we dont want border radius for ones that are in between (figma design! :D)
  highlighted,
  // we use this for auto scroll to highlighted(blue)/active event based on time
}) {
  const cardClasses = `
  ${styles.card}
  ${highlighted ? styles.highlighted : ""}
  ${isSingle ? styles.single : ""}
  ${isFirst && !isSingle ? styles.first : ""}
  ${isLast && !isSingle ? styles.last : ""}
  ${!isFirst && !isLast && !isSingle ? styles.middle : ""}
`;
// same as described in prop description above
// we simply use dynamic card styling based on its position

  return (
    <article className={cardClasses}>
      {/* this is where we used dynamic card styling */}
      <button className={styles.content} onClick={onClick}>
        {/* on click open event detail overlay */}
        <img className={styles.image} src={imgSmUrl} alt={title} />

        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.meta}>{time}</p>
          <p className={styles.meta}>{location}</p>
        </div>
      </button>

      <div className={styles.heart}>
        <HeartButton saved={isSaved} toggleSaved={toggleSaved} />
        {/* here we rented our heart reusable component
        isSaved shows state
        toggleSaved function to save or unsave */}
      </div>
    </article>
  );
}