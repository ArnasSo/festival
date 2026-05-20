import { useEffect, useState } from "react";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import styles from "./HighlightOverlay.module.css";

import closeIcon from "../../../assets/icon/close.svg";

export default function HighlightOverlay({
  title,
  bubbleImage,
  slides,
  onClose,
  onFinish,
  // props
  // title
  // small image showed in header
  // slides is an array of images for story
  // onclose insta close
  // onfinish function runs when final slide in array is finished
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // state to store which slide is currently shown
  // start at index 0 (first slide)

  const goNext = () => {
    // move to next slide
    if (currentIndex >= slides.length - 1) {
      onFinish();
      return;
    }
    // if current slide is last, finish story instead of going further

    setCurrentIndex(currentIndex + 1);
    // else move forwards - next slide
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goNext();
    }, 10000);
    // changing slide every 10 seconds

    return () => clearTimeout(timer);
    // we need to clean old timer before start new one with nw slide
    // we dont want multiple timers running
  }, [currentIndex]);

  return (
    <div className={styles.overlay}>
      <section
        className={styles.story}
        onClick={goNext}
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
      >
        {/* this is where we make on click to change slide goNext and
        also use dynamic background imag for current slide*/}

        <div className={styles.progressRow}>
          {slides.map((slide, index) => (
            <ProgressBar
              key={slide}
              // we use unique key for each slide bar
              active={index === currentIndex}
              // actuive means currently visible slide
              completed={index < currentIndex}
              // completed = slide before current one
            />
          ))}
        </div>

        <div className={styles.header}>
          <div className={styles.bubble}>
            <img src={bubbleImage} alt="" />
          </div>

          <span>{title}</span>
        </div>

        <button
          className={styles.closeButton}
          onClick={(event) => {
            event.stopPropagation();
            // we also use stoppropagation on close button because we dont want it to trigger goNext in the parent
            onClose();
          }}
        >
          <img src={closeIcon} alt="" />
        </button>
      </section>
    </div>
  );
}