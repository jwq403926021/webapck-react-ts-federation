import {createContext, useReducer} from "react";
import {CachedRouteDataAction, CachedRouteDataType, initialState, reducer} from "../reducer/cachedRouteReducer.ts";

export type KeepAliveContextType = {
  state: CachedRouteDataType;
  dispatch: React.Dispatch<CachedRouteDataAction>;
}
export const KeepAliveContext = createContext<KeepAliveContextType | undefined>(undefined);

export const CachedRouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <KeepAliveContext.Provider value={{state, dispatch}}>
      {children}
    </KeepAliveContext.Provider>
  )
};