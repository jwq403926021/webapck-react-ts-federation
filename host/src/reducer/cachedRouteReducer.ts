export interface CachedRouteDataType {
  cachedPath: string[],
  cachedElementMap: {[key: string] : React.ReactNode}
}
export type CachedRouteDataAction = { type: 'add'; payload: { cachedPath: string, cachedElement: React.ReactNode } };

export const initialState: CachedRouteDataType = {
  cachedPath: [],
  cachedElementMap: {},
};

export const reducer = (state: CachedRouteDataType, action: CachedRouteDataAction) => {
  switch (action.type) {
    case 'add':
      if (!state.cachedPath.includes(action.payload.cachedPath)) {
        state.cachedPath = [...state.cachedPath, action.payload.cachedPath]
        state.cachedElementMap[action.payload.cachedPath] = action.payload.cachedElement
      }
      return state
    default:
      return state
  }
};

