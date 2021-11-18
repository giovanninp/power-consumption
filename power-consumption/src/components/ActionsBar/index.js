import React from "react";
import styles from "./styles.module.css";
import { useData } from "../../context/Data";
import Button from "../Button";
import { set } from "../../services/firebase/database";

const turnStates = {
  true: "ON",
  false: "OFF",
};

const ActionsBar = () => {
  const { led, generator, power, toggle } = useData();
  return (
    <div className={styles.container}>
      <Button title={`LIGHTS ${turnStates[led]}`} turned={led} onPress={() => toggle('led')} />
      <Button title={`POWER ${turnStates[power]}`} turned={power} onPress={() => toggle('power')} />
      <Button title={`GENERATOR ${turnStates[generator]}`} turned={generator} onPress={() => toggle('generator')} />
    </div>
  );
};

export default ActionsBar;
