import React from "react";
import styles from "./styles.module.css";

const Button = ({ title, turned, onPress, disabled }) => {
  return (
    <div
      onClick={!disabled && onPress}
      className={`${styles.container} ${turned ? styles.turned : ""}`}
    >
      <strong className={styles.title}>{title}</strong>
    </div>
  );
};

export default Button;
