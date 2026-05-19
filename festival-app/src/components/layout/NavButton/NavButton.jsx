import styles from "./NavButton.module.css";

export default function NavButton({ label, icon, active}) {
    
    return (
        <div className={`${styles.navButton} ${active ? styles.navButtonActive : ''}`}>
            <span className="icon">{icon}</span>
            <span className="label">{label}</span>
        </div>
    );
}