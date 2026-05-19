import { useEffect, useState } from "react";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import styles from "./HighlightOverlay.module.css";

import closeIcon from "../../../assets/icon/close.svg";

export default function HighlightOverlay({
  title,
  bubbleImage,
  slides,
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    if (currentIndex >= slides.length - 1) {
      onClose();
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goNext();
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className={styles.overlay}>
      <section
        className={styles.story}
        onClick={goNext}
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
      >
        <div className={styles.progressRow}>
          {slides.map((slide, index) => (
            <ProgressBar
              key={slide}
              active={index === currentIndex}
              completed={index < currentIndex}
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
            onClose();
          }}
        >
          <img src={closeIcon} alt="" />
        </button>
      </section>
    </div>
  );
}