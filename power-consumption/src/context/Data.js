import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useRealtime } from "../hooks";
import { set } from "../services/firebase/database";

const Types = {
  syncData: "SYNC_DATA",
  setLoading: "SET_LOADING",
};

const Actions = {
  [Types.syncData]: (state, { potentiometer, led, power, generator }) => ({
    ...state,
    potentiometer,
    led,
    power,
    generator,
    loading: false,
  }),
  [Types.setLoading]: (state) => ({ ...state, loading: true }),
};

const Creators = {
  syncData: (potentiometer, led, power, generator) => ({
    type: Types.syncData,
    potentiometer,
    led,
    power,
    generator,
  }),
  setLoading: () => ({
    type: Types.setLoading,
  }),
};

const initialState = {
  potentiometer: 0,
  led: false,
  power: false,
  generator: false,
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;
  return Actions[type] ? Actions[type](state, payload) : state;
};

const Context = createContext(initialState);

export const useData = () => useContext(Context);

const toggleDispatcher = (dispatch, state) => (key) => {
  console.log("state", state);
  set(key, !state[key] ? 1 : 0);
  dispatch(Creators.setLoading());
};

// eslint-disable-next-line
export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value] = useRealtime();

  const toggle = useCallback(toggleDispatcher(dispatch, state), [
    state.generator,
    state.led,
    state.power,
  ]);

  useEffect(() => {
    if (value) {
      const [potentiometer, led, power, generator = 0] = value.split(",");
      console.log({ potentiometer, led, power });
      dispatch(
        Creators.syncData(
          Number.parseInt(potentiometer),
          !!Number.parseInt(led),
          !!Number.parseInt(power),
          !!Number.parseInt(generator)
        )
      );
    }
  }, [value]);

  console.log("state", { state, toggle });

  return (
    <Context.Provider value={{ ...state, toggle }}>{children}</Context.Provider>
  );
};
