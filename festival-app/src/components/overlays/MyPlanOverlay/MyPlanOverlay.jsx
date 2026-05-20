import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../../feedback/Toast/Toast";

import toggleOnIcon from "../../../assets/icon/toggle-on.svg";
import toggleOffIcon from "../../../assets/icon/toggle-off.svg";

import HeartButton from "../../ui/HeartButton/HeartButton";
import styles from "./MyPlanOverlay.module.css";

import closeIcon from "../../../assets/icon/close.svg";
import myPlanHeader from "../../../assets/image/vector-img/myplan-header.png";
import emptyLogo from "../../../assets/image/logo-img/myplan-logo.png";

export default function MyPlanOverlay({ events, toggleSaved, onClose }) {
  const isEmpty = events.length === 0;

  const sortedEvents = [...events].sort(
    (a, b) => Number(a.time.replace(".", "")) - Number(b.time.replace(".", ""))
  );

  const toastTimerRef = useRef(null);

  const [notificationsOn, setNotificationsOn] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastKey, setToastKey] = useState(0);

  const toggleNotifications = () => {
    const nextValue = !notificationsOn;

    setNotificationsOn(nextValue);
    setToastMessage(
      nextValue
        ? "You will get a reminder."
        : "You won't get a reminder."
    );

    // we force the toast animation to restart on every click otherwise the css animation get's messed up and keeps making toast dissapear after few clicks
    setToastKey((currentKey) => currentKey + 1);

    // we clear the old timer, so spam-clicking does not make the toast disappear randomly
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose}></div>

      <section className={styles.sheet}>
        <div
          className={styles.header}
          style={{ backgroundImage: `url(${myPlanHeader})` }}
        >
          <h2 className={styles.title}>MY PLAN</h2>

          <button className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="" />
          </button>
        </div>

        {isEmpty ? (
          <div className={styles.emptyState}>
            <img className={styles.emptyLogo} src={emptyLogo} alt="" />

            <p className={styles.emptyTitle}>Looks a little empty ...</p>
            <p className={styles.emptyText}>Ready to fill it up?</p>

            <Link to="/schedule">
              <button className={styles.discoverButton}>Discover Now</button>
            </Link>
          </div>
        ) : (
          <div className={styles.planContent}>
            <div className={styles.notificationRow}>
              <div className={styles.toastSlot}>
                {toastMessage && (
                  <Toast key={toastKey} message={toastMessage} inline />
                )}
              </div>

              <button
                className={styles.notificationToggle}
                onClick={toggleNotifications}
                type="button"
              >
                <img
                  src={notificationsOn ? toggleOnIcon : toggleOffIcon}
                  alt=""
                />
              </button>
            </div>

            <div className={styles.eventList}>
              {sortedEvents.map((event) => (
                <article className={styles.eventCard} key={event.id}>
                  <img
                    className={styles.eventImage}
                    src={event.imgSmUrl}
                    alt={event.name}
                  />

                  <div className={styles.eventText}>
                    <h3>{event.name}</h3>
                    <p>{event.time}</p>
                    <p>{event.location}</p>
                  </div>

                  <HeartButton
                    saved={true}
                    toggleSaved={() => toggleSaved(event.id)}
                  />
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}