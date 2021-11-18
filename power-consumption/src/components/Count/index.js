import React, { useEffect } from "react";
import { useData } from "../../context/Data";
import { useCounter } from "../../hooks";
import styles from "./styles.module.css";

const Count = () => {
  const { potentiometer } = useData();
  const [value, { increment }] = useCounter(0);

  useEffect(() => {
    increment(potentiometer);
  }, [potentiometer]);

  return (
    <div className={styles.container}>
      <div className={styles.value}>{value}</div>
      <div className={styles.unit}>Watts</div>
    </div>
  );
};

export default Count;
