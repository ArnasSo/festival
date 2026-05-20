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
  //props
  // we use:
  // events which are saved events shown in my plan
  // removes/saves event 
  // onclick close overlay

  const isEmpty = events.length === 0;
  // we check if user has any saved events

  const sortedEvents = [...events].sort(
    (a, b) => Number(a.time.replace(".", "")) - Number(b.time.replace(".", ""))
  );
  // we need to copy the event array and sort it by time
  // we copy because we dont want to change the original directly 
  // [...events] prevents that

  const toastTimerRef = useRef(null);
  // we store timer id without causing it to rerender
  // also used to clear the old toast timer (because we display toast only shortly)

  const [notificationsOn, setNotificationsOn] = useState(true);
  // state for notification/reminder toggle - default is true (on)

  const [toastMessage, setToastMessage] = useState("");
  // we are using css animation for toast
  // this is why we need a state for it because everytime you click toggle
  // we need to make sure animation restarts
  // if we dont restart it then it will just get very visually bugged

  const [toastKey, setToastKey] = useState(0);
  // state for turning on and of toggle also showing correct toast

  const toggleNotifications = () => {
    const nextValue = !notificationsOn;
    // oposite of current value

    setNotificationsOn(nextValue);
    // we update the state of notifications

    setToastMessage(
      nextValue
        ? "You will get a reminder."
        : "You won't get a reminder."
    );
    // then we simply set the text message of the toast

    setToastKey((currentKey) => currentKey + 1);
    // we increase key so react can see toast "as new" component

    // we clear the old timer, so spam-clicking does not make the toast disappear randomly
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
    }, 4000);
    // hide toast after 4 seconds :)
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


        {/* below: if no saved events - we need to show empty state */}
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

          // now if we actually have saved events, show my plan content
          <div className={styles.planContent}>
            <div className={styles.notificationRow}>
              <div className={styles.toastSlot}>
                {toastMessage && (
                  <Toast key={toastKey} message={toastMessage} inline />
                )}
                {/* making sure its only rendered IF message exsits
                we dont want empty toast :( ) */}
              </div>

              {/* simple toggle for notific/reminder button, using ternary in img */}
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
                    // we already know that my plan has only events that are saved,
                    // but react doesnt! so we use saved={true} :D

                    toggleSaved={() => toggleSaved(event.id)}
                    // click heart to remove the event with toggleSaved
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