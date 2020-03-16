import React, { createContext, useContext, useReducer } from "react";

type Action = {
  type: "SET_ERROR" | "DISMISS_ERROR";
  payload: string;
};

type State = string | null;

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const Error = createContext({} as ContextProps);

export const SET_ERROR = "SET_ERROR";
export const DISMISS_ERROR = "DISMISS_ERROR";

const initialState = null;
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_ERROR: {
      return action.payload;
    }
    case DISMISS_ERROR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Error.Provider value={value}>{children}</Error.Provider>;
};

export const useErrorDispatch = () => {
  return useContext(Error);
};

export default ErrorProvider;
