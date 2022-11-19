import React from "react";
import styles from "../styles/Spinner.module.scss";

export default function LoadingSpinner({ ...props }) {
  return (
    <div {...props}>
      wait...
      <div className={styles.loading_spinner}></div>
    </div>
  );
}
