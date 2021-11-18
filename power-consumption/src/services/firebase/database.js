import { getDatabase, ref, onValue, set as setter } from "firebase/database";

const db = getDatabase();

// eslint-disable-next-line
export default (onChange = () => null) => {
  const dataRef = ref(db, "/data");
  onValue(dataRef, (snap) => {
    const data = snap.val();
    onChange(data);
  });
};

export const set = (key, value) => {
  const dataRef = ref(db, `${key}`);
  setter(dataRef, value);
};
