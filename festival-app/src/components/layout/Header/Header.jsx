import styles from "./Header.module.css";
import headerLogo from "../../../assets/icon/header.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={headerLogo}
        alt="Blå Sol Festival"
      />
    </header>
  );
}