import styles from "./NavButton.module.css";

export default function NavButton({ label, icon, active }) {
  return (
    <div className={`${styles.navButton} ${active ? styles.active : ""}`}>
      <div className={styles.iconBox}>
        <img className={styles.icon} src={icon} alt="" />
      </div>

      <span className={styles.label}>{label}</span>
    </div>
  );
}