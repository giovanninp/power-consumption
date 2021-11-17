import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useRealtime } from "../hooks";

const Types = {
  setPotentiometer: "SET_POTENTIOMETER",
};

const Actions = {
  [Types.setPotentiometer]: (state, { potentiometer }) => ({
    ...state,
    potentiometer,
  }),
};

const Creators = {
  setPotentiometer: (potentiometer) => ({
    type: Types.setPotentiometer,
    potentiometer,
  }),
};

const initialState = {
  potentiometer: 0,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;
  return Actions[type] ? Actions[type](state, payload) : state;
};

const Context = createContext(initialState);

export const useData = () => useContext(Context);

// eslint-disable-next-line
export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value] = useRealtime();

  useEffect(() => {
    if (value) {
      const [potentiometer] = value.split(",");
      console.log("values", potentiometer);
      dispatch(Creators.setPotentiometer(Number.parseInt(potentiometer)));
    }
  }, [value]);

  return <Context.Provider value={{ ...state }}>{children}</Context.Provider>;
};
