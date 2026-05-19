import { NavLink } from "react-router-dom";
import NavButton from "../NavButton/NavButton";
import styles from "./BottomNav.module.css";

import startIcon from "../../../assets/icon/start.svg";
import scheduleIcon from "../../../assets/icon/program.svg";
import mapIcon from "../../../assets/icon/map.svg";
import artistIcon from "../../../assets/icon/artist.svg";
import menuIcon from "../../../assets/icon/menu.svg";

export default function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      <NavLink to="/" end className={styles.navLink}>
        {({ isActive }) => (
          <NavButton label="Start" icon={startIcon} active={isActive} />
        )}
      </NavLink>

      <NavLink to="/schedule" className={styles.navLink}>
        {({ isActive }) => (
          <NavButton label="Schedule" icon={scheduleIcon} active={isActive} />
        )}
      </NavLink>

      <NavLink to="/map" className={styles.navLink}>
        {({ isActive }) => (
          <NavButton label="Map" icon={mapIcon} active={isActive} />
        )}
      </NavLink>

      <NavLink to="/artists" className={styles.navLink}>
        {({ isActive }) => (
          <NavButton label="Artists" icon={artistIcon} active={isActive} />
        )}
      </NavLink>

      <NavLink to="/menu" className={styles.navLink}>
        {({ isActive }) => (
          <NavButton label="Menu" icon={menuIcon} active={isActive} />
        )}
      </NavLink>
    </nav>
  );
}