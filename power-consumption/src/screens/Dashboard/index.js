import React from "react";
import { useData } from "../../context/Data";

const Dashboard = () => {
  const { potentiometer } = useData();

  return <div>{potentiometer}</div>;
};

export default Dashboard;
