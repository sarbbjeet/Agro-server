import React from "react";
import styles from "../styles/Spinner.module.scss";
import { f2 as ff } from "../styles/variables.module.scss";

export default function LoadingSpinner({ ...props }) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center">
        <div style={{ fontFamily: ff }}>Connecting...</div>
        <div className={styles.loading_spinner}></div>
      </div>
    </div>
  );
}
