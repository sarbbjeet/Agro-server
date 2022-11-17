import React from "react";
import styles from "../styles/ToggleSwitch.module.scss";

export default function ToggleSwitch({ label, ...props }) {
  return (
    <div className={styles.container}>
      {/* {label} */}
      <div className={styles.toggle_switch}>
        <input
          {...props}
          type="checkbox"
          //   checked={true}
          className={styles.checkbox}
          name={label}
          id={label}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
}
