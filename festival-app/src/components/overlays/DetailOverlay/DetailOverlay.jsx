import HeartButton from "../../ui/HeartButton/HeartButton";
import Tag from "../../ui/Tag/Tag";
import styles from "./DetailOverlay.module.css";

import locationIcon from "../../../assets/icon/location.svg";
import timeIcon from "../../../assets/icon/time.svg";
import heartWhiteIcon from "../../../assets/icon/heart-white.svg";
import closeIcon from "../../../assets/icon/close.svg";

export default function DetailOverlay(props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={props.onClose}></div>

      <section className={styles.sheet}>
        <button className={styles.closeButton} onClick={props.onClose}>
          <img src={closeIcon} alt="" />
        </button>

        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${props.imgSmUrl})` }}
        >
          <div className={styles.dragHandle}></div>
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