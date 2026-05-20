import styles from "./LandingEventCard.module.css";
import frameImage from "../../../assets/image/vector-img/landing-ui-frame.png";

export default function LandingEventCard({ title, imgLgUrl, onClick }) {
  // props
  // event title
  // large event image url
  // function on click
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img className={styles.frame} src={frameImage} alt="" />
        {/* frameImage is the blue shape behind the event image  */}
        <img className={styles.image} src={imgLgUrl} alt={title} />
      </div>

      <h3 className={styles.title}>{title}</h3>
    </article>
  );
}