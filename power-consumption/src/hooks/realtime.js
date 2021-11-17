import { useEffect, useState } from "react";
import { database } from "../services";

// eslint-disable-next-line
export default () => {
  const [value, setValue] = useState();

  useEffect(() => {
    database(setValue);
  }, []);

  return [value];
};
