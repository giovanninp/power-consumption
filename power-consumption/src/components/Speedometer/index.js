import React from "react";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import styles from "./styles.module.css";
import { useData } from "../../context/Data";

/*
    range = [min, max]
    value = number

*/

const Speedometer = () => {
  const { potentiometer = 0 } = useData();
  return (
    <div className={styles.container}>
      <ResponsiveRadialBar
        data={[
          { id: "POWER", data: [{ x: "Potentiometer", y: potentiometer }] },
        ]}
        startAngle={-130}
        endAngle={130}
        innerRadius={0.4}
        padding={0.35}
        cornerRadius={45}
        maxValue={4000}
      />
    </div>
  );
};

export default Speedometer;
