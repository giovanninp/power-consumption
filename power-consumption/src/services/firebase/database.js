import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();

// eslint-disable-next-line
export default (onChange = () => null) => {
  const dataRef = ref(db, "/data");
  onValue(dataRef, (snap) => {
    const data = snap.val();
    onChange(data);
  });
};
