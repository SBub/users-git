import React, { createContext, useContext, useReducer } from "react";

type Action = {
  type: "SET_ERROR" | "DISMISS_ERROR";
  payload: string;
};

type State = string | null;

type ErrorDispatchType = React.Dispatch<Action>;

const ErrorDispatch = createContext((() => {}) as ErrorDispatchType);
const ErrorState = createContext<State>(null);

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

const ErrorProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ErrorDispatch.Provider value={dispatch}>
      <ErrorState.Provider value={state} children={children} />
    </ErrorDispatch.Provider>
  );
};

export const useErrorDispatch = () => {
  return useContext(ErrorDispatch);
};

export const useErrorState = () => {
  return useContext(ErrorState);
};

export default ErrorProvider;
