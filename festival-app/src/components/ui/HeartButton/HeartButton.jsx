import heartIcon from "../../../assets/icon/heart.svg";
import heartFilledIcon from "../../../assets/icon/heart-filled.svg";
import styles from "./HeartButton.module.css";

export default function HeartButton({ 
  saved, 
  // boolean
  toggleSaved,
  //  function to save or unsave event
  customIcon }) {
    // our PROPS above
  return (
    <button
      className={styles.heartButton}
      onClick={(event) => {
        event.stopPropagation();
        // we use .stopPropagation to avoid clicking parent element in layout
        // for example when you press heart - you also "press" event card - we dont want it to open
        // we nly wany heart to be pressed
        toggleSaved();
        // run the function :)
      }}
      aria-label={saved ? "Remove from my plan" : "Add to my plan"}
      // just in case we added accessibility labels for screen readers
      // ternary operator to change the label based on state
    >
      <img
        className={styles.icon}
        src={saved ? heartFilledIcon : customIcon || heartIcon}
        // another conditional render
        // is event is saved = show filled heart
        // : - else show custom if passed, otherwise (OR ||) show default heart
        alt=""
      />
    </button>
  );
}