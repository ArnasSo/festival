import HeartButton from "../../ui/HeartButton/HeartButton";
import Tag from "../../ui/Tag/Tag";
import styles from "./DetailOverlay.module.css";

import locationIcon from "../../../assets/icon/location.svg";
import timeIcon from "../../../assets/icon/time.svg";
import heartWhiteIcon from "../../../assets/icon/heart-white.svg";
import closeIcon from "../../../assets/icon/close.svg";
// overlay component that opens when user selects an event card
// we access props thgouth props.title, .time etc...
export default function DetailOverlay(props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={props.onClose}></div>
      {/* dark background behind the overlay
      on click close overlay */}

      <section className={styles.sheet}>
        <button className={styles.closeButton} onClick={props.onClose}>
          <img src={closeIcon} alt="" />
        </button>

        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${props.imgSmUrl})` }}
        >
        {/* i think its only place we use inline styling because image changes depending on event data */}
          <div className={styles.dragHandle}></div>
          {/* small visual handle element to suggest drag down  */}
          <h2 className={styles.title}>{props.title}</h2>
        </div>

        <div className={styles.infoBand}>
          <div className={styles.infoText}>
            <p className={styles.infoItem}>
              <img src={locationIcon} alt="" />
              {props.location}
            </p>

            <p className={styles.infoItem}>
              <img src={timeIcon} alt="" />
              {props.time}
            </p>
          </div>

          <HeartButton
            saved={props.isSaved}
            toggleSaved={props.toggleSaved}
            customIcon={heartWhiteIcon}
          />
          {/* we use different heart icon as default icon (unliked) 
          because desgn is different from the main reusable heart component */}
        </div>

        <div className={styles.content}>
          <div className={styles.tags}>
            {props.tags?.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          <p className={styles.description}>{props.description}</p>
        </div>
      </section>
    </div>
  );
}