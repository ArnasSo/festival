import styles from "./Tag.module.css";
// our resuable tag component
export default function Tag({ label }) 
// label is the PROP (text whats shown inside the tag)
{
  return (
    <span className={styles.tag}>
      {label}
    </span>
  );
}