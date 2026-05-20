import styles from "./NavButton.module.css";
// reusable navigation button component
export default function NavButton({ label, icon, active }) {
  // PROPS
  // text under icon
  // icon image source
  // boolen active page state
  return (
    // we use those `` "ticks" because we mix strings
    // its called template literal or template string
    // u can write it oldschool like this:
    // className={styles.navButton + " " + (active ? styles.active : "") }
    <div className={`${styles.navButton} ${active ? styles.active : ""}`}>
      <div className={styles.iconBox}>
        <img className={styles.icon} src={icon} alt="" />
      </div>

      <span className={styles.label}>{label}</span>
    </div>
  );
}