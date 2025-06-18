import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer} role="alert" aria-live="assertive" aria-busy="true">
      <div className={styles.spinner}></div>
    </div>
  );
}
