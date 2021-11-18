import React from "react";
import { useData } from "../../context/Data";
import { Speedometer, ActionsBar, Loading, Count } from "../../components";
import styles from "./styles.module.css";

const Dashboard = () => {
  const { loading } = useData();

  return (
    <div className={styles.container}>
      <Speedometer />
      <Count />
      <ActionsBar />
      {loading && <Loading />}
    </div>
  );
};

export default Dashboard;
