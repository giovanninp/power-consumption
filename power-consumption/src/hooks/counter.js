import { useState } from "react";

// eslint-disable-next-line
export default (initialValue = 0) => {
  const [value, setValue] = useState(initialValue);

  const increment = (inc) => setValue((prev) => prev + inc);

  return [value, { increment }];
};
