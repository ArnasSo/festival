import styles from "./Toast.module.css";
// resusable toast
// consistency!
// we only have 2 toasts now
// this allows use of toasts in the rest of the app without having to
// seperately redesign them
// we kept inline as second type of toast style
export default function Toast({ message, inline = false }) {
  // props are message (text inside) and default optional boolean for inline
  return (
    <div className={`${styles.toast} ${inline ? styles.inline : ""}`}>
      {message}
    </div>
  );
}