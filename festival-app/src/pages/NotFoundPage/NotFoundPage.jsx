import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NotFoundPage.module.css";

import notFoundLogo from "../../assets/image/logo-img/404page-logo.png";

export default function NotFoundPage() {
useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>NEJ!!!!!</h1>
        <p className={styles.subtitle}>Blå Sol isn't on this page :(</p>

        <img
          className={styles.logo}
          src={notFoundLogo}
          alt="404 page not found"
        />

        <p className={styles.text}>Let's get you back to the party.</p>

        <Link className={styles.button} to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
}