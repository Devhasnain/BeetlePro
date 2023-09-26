'use client'
import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  offers: Array<any>;
  barsWithDistance: Array<any>;
  user:any;
};

type ActionType = {
  type: string;
  payload?: any;
};

const initialState: StateType = {
  offers: [],
  barsWithDistance:[],
  user:{},
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "OFFERS":
      return { ...state, offers: action.payload };
    case "barsWithDistance":
      return { ...state, barsWithDistance: action.payload };
    case "USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ContextProvider= ({ children }:any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
);
};
